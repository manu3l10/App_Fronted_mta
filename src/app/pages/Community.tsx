import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Heart, MessageCircle, Bookmark, MoreHorizontal, MapPin, Plus, X, Image as ImageIcon, Send } from "lucide-react";
import { useNavigate } from "react-router";
import {
  CommunityCommentRecord,
  CommunityLikeRecord,
  CommunityPostRecord,
  createCommunityComment,
  createCommunityPost,
  deleteCommunityPost,
  getCurrentUserId,
  listCommunityCommentsByPostIds,
  listCommunityLikesByPostIds,
  listCommunityPosts,
  toggleCommunityLike,
  updateCommunityPost,
} from "../../lib/communityApi";

const POST_COOLDOWN_MS = 8000;

interface Comment {
  id: string;
  userId: string;
  username: string;
  text: string;
  editable: boolean;
}

interface Post {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  location: string;
  image: string;
  likes: number;
  comments: number;
  caption: string;
  liked: boolean;
  saved: boolean;
  commentList: Comment[];
  editable: boolean;
}

const mapCommentRecordToComment = (
  record: CommunityCommentRecord,
  currentUserId: string | null
): Comment => ({
  id: record.id,
  userId: record.user_id,
  username: record.author_name,
  text: record.content,
  editable: record.user_id === currentUserId,
});

const buildPostsFromRecords = (params: {
  posts: CommunityPostRecord[];
  comments: CommunityCommentRecord[];
  likes: CommunityLikeRecord[];
  currentUserId: string | null;
}): Post[] => {
  const commentsByPostId = new Map<string, Comment[]>();
  const likesCountByPostId = new Map<string, number>();
  const likedByMe = new Set<string>();

  for (const comment of params.comments) {
    const nextComment = mapCommentRecordToComment(comment, params.currentUserId);
    const existing = commentsByPostId.get(comment.post_id) ?? [];
    commentsByPostId.set(comment.post_id, [...existing, nextComment]);
  }

  for (const like of params.likes) {
    likesCountByPostId.set(like.post_id, (likesCountByPostId.get(like.post_id) ?? 0) + 1);
    if (params.currentUserId && like.user_id === params.currentUserId) {
      likedByMe.add(like.post_id);
    }
  }

  return params.posts.map((record) => {
    const commentList = commentsByPostId.get(record.id) ?? [];

    return {
      id: record.id,
      userId: record.user_id,
      username: record.author_name,
      avatar: record.author_avatar,
      location: record.location,
      image: record.image_url,
      likes: likesCountByPostId.get(record.id) ?? 0,
      comments: commentList.length,
      caption: record.caption,
      liked: likedByMe.has(record.id),
      saved: false,
      commentList,
      editable: record.user_id === params.currentUserId,
    };
  });
};

export function Community() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({});
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [activePostMenu, setActivePostMenu] = useState<string | null>(null);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isSubmittingPost, setIsSubmittingPost] = useState(false);
  const [publishCooldownUntil, setPublishCooldownUntil] = useState(0);
  const [cooldownTick, setCooldownTick] = useState(0);
  const [likePendingByPost, setLikePendingByPost] = useState<Record<string, boolean>>({});
  const [commentPendingByPost, setCommentPendingByPost] = useState<Record<string, boolean>>({});
  const [newPost, setNewPost] = useState({
    location: "",
    caption: "",
    image: "",
  });

  const nowMs = Date.now() + cooldownTick * 0;
  const isPublishCooldownActive = !editingPost && nowMs < publishCooldownUntil;
  const publishCooldownSeconds = Math.max(0, Math.ceil((publishCooldownUntil - nowMs) / 1000));

  const canSubmitPost = useMemo(
    () =>
      !isSubmittingPost &&
      !isPublishCooldownActive &&
      Boolean(newPost.location.trim() && newPost.caption.trim() && newPost.image.trim()),
    [isSubmittingPost, isPublishCooldownActive, newPost]
  );

  const fetchPosts = async () => {
    setIsLoading(true);
    setLoadError(null);

    try {
      const userId = await getCurrentUserId();
      const postRecords = await listCommunityPosts();
      const postIds = postRecords.map((post) => post.id);

      const [comments, likes] = await Promise.all([
        listCommunityCommentsByPostIds(postIds),
        listCommunityLikesByPostIds(postIds),
      ]);

      setCurrentUserId(userId);
      setPosts(
        buildPostsFromRecords({
          posts: postRecords,
          comments,
          likes,
          currentUserId: userId,
        })
      );
    } catch (error: any) {
      console.error("Error loading community posts:", error);
      setLoadError(error?.message ?? "No se pudieron cargar las publicaciones.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (!isPublishCooldownActive) return;

    const interval = window.setInterval(() => {
      setCooldownTick((prev) => prev + 1);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isPublishCooldownActive]);

  const toggleLike = async (id: string) => {
    if (likePendingByPost[id]) return;

    const previousPost = posts.find((post) => post.id === id);
    if (!previousPost) return;

    const optimisticLiked = !previousPost.liked;
    const optimisticLikes = optimisticLiked ? previousPost.likes + 1 : Math.max(0, previousPost.likes - 1);

    setLikePendingByPost((prev) => ({ ...prev, [id]: true }));
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? { ...post, liked: optimisticLiked, likes: optimisticLikes }
          : post
      )
    );

    try {
      const result = await toggleCommunityLike(id);
      setPosts((prev) =>
        prev.map((post) => {
          if (post.id !== id) return post;
          if (post.liked === result.liked) return post;

          return {
            ...post,
            liked: result.liked,
            likes: result.liked ? post.likes + 1 : Math.max(0, post.likes - 1),
          };
        })
      );
    } catch (error: any) {
      console.error("Error toggling like:", error);
      setPosts((prev) =>
        prev.map((post) => (post.id === id ? previousPost : post))
      );
      window.alert(error?.message ?? "No se pudo registrar el like.");
    } finally {
      setLikePendingByPost((prev) => ({ ...prev, [id]: false }));
    }
  };

  const toggleSave = (id: string) => {
    setPosts((prev) => prev.map((post) => (post.id === id ? { ...post, saved: !post.saved } : post)));
  };

  const addComment = async (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;
    if (commentPendingByPost[postId]) return;

    setCommentPendingByPost((prev) => ({ ...prev, [postId]: true }));

    try {
      const createdComment = await createCommunityComment({ postId, content: text });
      const mappedComment = mapCommentRecordToComment(createdComment, currentUserId);

      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: post.comments + 1,
                commentList: [...post.commentList, mappedComment],
              }
            : post
        )
      );

      setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
      setOpenComments((prev) => ({ ...prev, [postId]: true }));
    } catch (error: any) {
      console.error("Error creating comment:", error);
      window.alert(error?.message ?? "No se pudo publicar el comentario.");
    } finally {
      setCommentPendingByPost((prev) => ({ ...prev, [postId]: false }));
    }
  };

  const handleImageFile = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setNewPost((prev) => ({ ...prev, image: String(reader.result) }));
    };
    reader.readAsDataURL(file);
  };

  const createPost = async () => {
    if (isSubmittingPost) return;
    if (Date.now() < publishCooldownUntil) return;

    const location = newPost.location.trim();
    const caption = newPost.caption.trim();
    const image = newPost.image.trim();
    if (!location || !caption || !image) return;

    try {
      setIsSubmittingPost(true);
      const createdRecord = await createCommunityPost({ location, caption, imageUrl: image });

      const createdPost: Post = {
        id: createdRecord.id,
        userId: createdRecord.user_id,
        username: createdRecord.author_name,
        avatar: createdRecord.author_avatar,
        location: createdRecord.location,
        image: createdRecord.image_url,
        likes: 0,
        comments: 0,
        caption: createdRecord.caption,
        liked: false,
        saved: false,
        commentList: [],
        editable: createdRecord.user_id === currentUserId,
      };

      setPosts((prev) => [createdPost, ...prev]);
      setNewPost({ location: "", caption: "", image: "" });
      setShowCreatePost(false);
      setEditingPost(null);
      setPublishCooldownUntil(Date.now() + POST_COOLDOWN_MS);

      if (!currentUserId) {
        setCurrentUserId(createdRecord.user_id);
      }
    } catch (error: any) {
      console.error("Error creating post:", error);
      window.alert(error?.message ?? "No se pudo crear la publicación.");
    } finally {
      setIsSubmittingPost(false);
    }
  };

  const startEditPost = (post: Post) => {
    setEditingPost(post);
    setNewPost({
      location: post.location,
      caption: post.caption,
      image: post.image,
    });
    setShowCreatePost(true);
    setActivePostMenu(null);
  };

  const saveEditedPost = async () => {
    if (!editingPost) return;
    if (isSubmittingPost) return;

    const location = newPost.location.trim();
    const caption = newPost.caption.trim();
    const image = newPost.image.trim();
    if (!location || !caption || !image) return;

    try {
      setIsSubmittingPost(true);
      const updated = await updateCommunityPost(editingPost.id, {
        location,
        caption,
        imageUrl: image,
      });

      setPosts((prev) =>
        prev.map((post) =>
          post.id === editingPost.id
            ? {
                ...post,
                location: updated.location,
                caption: updated.caption,
                image: updated.image_url,
              }
            : post
        )
      );

      setEditingPost(null);
      setNewPost({ location: "", caption: "", image: "" });
      setShowCreatePost(false);
    } catch (error: any) {
      console.error("Error updating post:", error);
      window.alert(error?.message ?? "No se pudo actualizar la publicación.");
    } finally {
      setIsSubmittingPost(false);
    }
  };

  const deletePost = async (id: string) => {
    try {
      await deleteCommunityPost(id);
      setPosts((prev) => prev.filter((post) => post.id !== id));
      setActivePostMenu(null);
    } catch (error: any) {
      console.error("Error deleting post:", error);
      window.alert(error?.message ?? "No se pudo eliminar la publicación.");
    }
  };

  const closePostModal = () => {
    if (isSubmittingPost) return;
    setShowCreatePost(false);
    setEditingPost(null);
    setNewPost({ location: "", caption: "", image: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-purple-100/50 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="font-semibold text-gray-900">Comunidad</h1>
          <button
            onClick={() => setShowCreatePost(true)}
            className="p-2 hover:bg-purple-100/50 rounded-lg transition-colors"
          >
            <Plus className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto pb-6">
        {isLoading && (
          <div className="p-8 text-center text-gray-500">Cargando publicaciones...</div>
        )}

        {!isLoading && loadError && (
          <div className="mx-4 mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {loadError}
            <button
              onClick={fetchPosts}
              className="ml-2 underline font-medium"
            >
              Reintentar
            </button>
          </div>
        )}

        {!isLoading && !loadError && posts.length === 0 && (
          <div className="p-8 text-center text-gray-500">Aún no hay publicaciones en la comunidad.</div>
        )}

        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="bg-white mb-6 border-b border-gray-100 last:border-b-0"
          >
            <div className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={post.avatar}
                  alt={post.username}
                  className="w-10 h-10 rounded-full border-2 border-purple-200"
                />
                <div>
                  <p className="font-semibold text-gray-900">{post.username}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <MapPin className="w-3 h-3" />
                    <span>{post.location}</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <button
                  onClick={() => setActivePostMenu((current) => (current === post.id ? null : post.id))}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <MoreHorizontal className="w-5 h-5 text-gray-600" />
                </button>

                {activePostMenu === post.id && (
                  <>
                    <button
                      className="fixed inset-0 z-10 cursor-default"
                      aria-label="Cerrar menú"
                      onClick={() => setActivePostMenu(null)}
                    />
                    <div className="absolute right-0 top-10 z-20 w-40 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden">
                      {post.editable ? (
                        <>
                          <button
                            onClick={() => startEditPost(post)}
                            className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 transition-colors"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => deletePost(post.id)}
                            className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            Eliminar
                          </button>
                        </>
                      ) : (
                        <p className="px-4 py-3 text-sm text-gray-500">Publicación de la comunidad</p>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="w-full aspect-square bg-gray-100">
              <img src={post.image} alt={post.location} className="w-full h-full object-cover" />
            </div>

            <div className="px-4 py-3">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <motion.button
                    whileTap={{ scale: likePendingByPost[post.id] ? 1 : 0.9 }}
                    onClick={() => toggleLike(post.id)}
                    className="transition-colors disabled:opacity-50"
                    disabled={Boolean(likePendingByPost[post.id])}
                  >
                    <Heart
                      className={`w-6 h-6 ${
                        post.liked ? "fill-red-500 text-red-500" : "text-gray-700"
                      }`}
                    />
                  </motion.button>
                  <button
                    onClick={() => setOpenComments((prev) => ({ ...prev, [post.id]: !prev[post.id] }))}
                    className="hover:text-purple-600 transition-colors"
                  >
                    <MessageCircle className="w-6 h-6 text-gray-700" />
                  </button>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleSave(post.id)}
                  className="transition-colors"
                >
                  <Bookmark
                    className={`w-6 h-6 ${
                      post.saved ? "fill-purple-600 text-purple-600" : "text-gray-700"
                    }`}
                  />
                </motion.button>
              </div>

              <p className="font-semibold text-sm text-gray-900 mb-1">{post.likes.toLocaleString()} me gusta</p>
              <p className="text-sm text-gray-900">
                <span className="font-semibold">{post.username}</span> {post.caption}
              </p>
              {post.comments > 0 && (
                <button
                  onClick={() => setOpenComments((prev) => ({ ...prev, [post.id]: !prev[post.id] }))}
                  className="text-sm text-gray-500 mt-2"
                >
                  Ver los {post.comments} comentarios
                </button>
              )}

              {openComments[post.id] && (
                <div className="mt-3 space-y-2 border-t border-gray-100 pt-3">
                  {post.commentList.length > 0 ? (
                    post.commentList.map((comment) => (
                      <p key={comment.id} className="text-sm text-gray-800">
                        <span className="font-semibold">{comment.username}</span> {comment.text}
                      </p>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">Sé la primera persona en comentar.</p>
                  )}
                </div>
              )}

              <div className="mt-3 flex items-center gap-2 border-t border-gray-100 pt-3">
                <input
                  value={commentInputs[post.id] ?? ""}
                  onChange={(event) => setCommentInputs((prev) => ({ ...prev, [post.id]: event.target.value }))}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") addComment(post.id);
                  }}
                  placeholder="Añade un comentario..."
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-200"
                />
                <button
                  onClick={() => addComment(post.id)}
                  className="p-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors disabled:opacity-50"
                  aria-label="Publicar comentario"
                  disabled={Boolean(commentPendingByPost[post.id])}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowCreatePost(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-xl flex items-center justify-center z-40"
      >
        <Plus className="w-6 h-6" />
      </motion.button>

      {showCreatePost && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm flex items-center justify-center overflow-y-auto p-4">
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="w-full max-w-lg max-h-[calc(100vh-2rem)] bg-white rounded-2xl shadow-2xl border border-purple-100 overflow-hidden flex flex-col"
          >
            <div className="p-4 border-b border-purple-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-purple-600">Nueva publicación</p>
                <h2 className="font-semibold text-slate-900">Comparte tu viaje</h2>
              </div>
              <button
                onClick={closePostModal}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 disabled:opacity-50"
                aria-label="Cerrar"
                disabled={isSubmittingPost}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4 overflow-y-auto">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Ubicación</span>
                <input
                  value={newPost.location}
                  onChange={(event) => setNewPost((prev) => ({ ...prev, location: event.target.value }))}
                  placeholder="Ej: Salento, Colombia"
                  className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-200"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">Descripción</span>
                <textarea
                  value={newPost.caption}
                  onChange={(event) => setNewPost((prev) => ({ ...prev, caption: event.target.value }))}
                  placeholder="Cuenta algo de tu experiencia..."
                  rows={3}
                  className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none resize-none focus:ring-2 focus:ring-purple-200"
                />
              </label>

              <div className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Imagen</span>
                <input
                  value={newPost.image.startsWith("data:") ? "" : newPost.image}
                  onChange={(event) => setNewPost((prev) => ({ ...prev, image: event.target.value }))}
                  placeholder="Pega una URL de imagen"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-200"
                />
                <label className="flex items-center justify-center gap-2 border border-dashed border-purple-200 rounded-lg px-3 py-3 text-sm text-purple-700 cursor-pointer hover:bg-purple-50 transition-colors">
                  <ImageIcon className="w-4 h-4" />
                  Subir imagen desde el equipo
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => handleImageFile(event.target.files?.[0])}
                  />
                </label>
              </div>

              {newPost.image && (
                <div className="aspect-video bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
                  <img src={newPost.image} alt="Vista previa" className="w-full h-full object-cover" />
                </div>
              )}

              <button
                onClick={editingPost ? saveEditedPost : createPost}
                disabled={!canSubmitPost}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2.5 rounded-lg text-sm font-medium hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmittingPost
                  ? (editingPost ? "Guardando..." : "Publicando...")
                  : isPublishCooldownActive
                    ? `Espera ${publishCooldownSeconds}s para volver a publicar`
                    : (editingPost ? "Guardar cambios" : "Publicar")}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
