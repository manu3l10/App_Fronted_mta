import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Heart, MessageCircle, Bookmark, MoreHorizontal, MapPin, Plus, X, Image as ImageIcon, Send } from "lucide-react";
import { useNavigate } from "react-router";

interface Comment {
  id: number;
  username: string;
  text: string;
}

interface Post {
  id: number;
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
  editable?: boolean;
}

export function Community() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      username: "maria_travels",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
      location: "París, Francia",
      image: "https://images.unsplash.com/photo-1642947392578-b37fbd9a4d45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyJTIwc3Vuc2V0fGVufDF8fHx8MTc3Mzc1Mzc5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      likes: 1243,
      comments: 89,
      caption: "¡El atardecer en París nunca decepciona! 🗼✨ #ParisVibes #TravelGoals",
      liked: false,
      saved: false,
      commentList: [
        { id: 101, username: "viajero_col", text: "Ese cielo está brutal. París siempre gana." },
        { id: 102, username: "ana_routes", text: "¿Desde dónde tomaste la foto?" },
      ],
    },
    {
      id: 2,
      username: "adventure_seeker",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Adventure",
      location: "Tokio, Japón",
      image: "https://images.unsplash.com/photo-1679097844800-b0cb637306ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGphcGFuJTIwc3RyZWV0JTIwbmlnaHR8ZW58MXx8fHwxNzczODA1NjUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      likes: 892,
      comments: 54,
      caption: "Las calles de Tokio de noche son pura magia 🇯🇵✨",
      liked: true,
      saved: false,
      commentList: [
        { id: 201, username: "camilo_trip", text: "Tokio de noche parece otro planeta." },
      ],
    },
    {
      id: 3,
      username: "wanderlust_soul",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Wanderlust",
      location: "Colombia",
      image: "https://images.unsplash.com/photo-1493925410384-84f842e616fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvbWJpYSUyMGNvZmZlZSUyMG1vdW50YWluc3xlbnwxfHx8fDE3NzM4MDU2NDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      likes: 2156,
      comments: 134,
      caption: "Café colombiano con estas vistas... ¡no hay nada mejor! ☕🏔️",
      liked: false,
      saved: true,
      commentList: [
        { id: 301, username: "mta_user", text: "Necesito ese plan en mi próximo viaje." },
      ],
    },
    {
      id: 4,
      username: "romantic_voyager",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Romantic",
      location: "Maldivas",
      image: "https://images.unsplash.com/photo-1591625717042-3b2b55f6a388?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGJlYWNoJTIwY291cGxlfGVufDF8fHx8MTc3Mzc2OTc5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      likes: 3421,
      comments: 201,
      caption: "Luna de miel perfecta 🌴💙 #MaldivasParadise",
      liked: false,
      saved: false,
      commentList: [],
    },
    {
      id: 5,
      username: "explorer_alex",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Explorer",
      location: "Barcelona, España",
      image: "https://images.unsplash.com/photo-1741304787559-a392853b613b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJjZWxvbmElMjBhcmNoaXRlY3R1cmUlMjBnYXVkaXxlbnwxfHx8fDE3NzM3MTY5NjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      likes: 1567,
      comments: 92,
      caption: "La arquitectura de Gaudí es simplemente impresionante 🏛️✨",
      liked: true,
      saved: false,
      commentList: [
        { id: 501, username: "laura_mapas", text: "La Sagrada Familia es de otro nivel." },
      ],
    },
  ]);
  const [commentInputs, setCommentInputs] = useState<Record<number, string>>({});
  const [openComments, setOpenComments] = useState<Record<number, boolean>>({});
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [activePostMenu, setActivePostMenu] = useState<number | null>(null);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [newPost, setNewPost] = useState({
    location: "",
    caption: "",
    image: "",
  });

  const toggleLike = (id: number) => {
    setPosts(
      posts.map((post) =>
        post.id === id
          ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
          : post
      )
    );
  };

  const toggleSave = (id: number) => {
    setPosts(posts.map((post) => (post.id === id ? { ...post, saved: !post.saved } : post)));
  };

  const addComment = (postId: number) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;

    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments + 1,
              commentList: [
                ...post.commentList,
                {
                  id: Date.now(),
                  username: "tu_cuenta",
                  text,
                },
              ],
            }
          : post
      )
    );
    setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
    setOpenComments((prev) => ({ ...prev, [postId]: true }));
  };

  const handleImageFile = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setNewPost((prev) => ({ ...prev, image: String(reader.result) }));
    };
    reader.readAsDataURL(file);
  };

  const createPost = () => {
    const location = newPost.location.trim();
    const caption = newPost.caption.trim();
    const image = newPost.image.trim();
    if (!location || !caption || !image) return;

    const post: Post = {
      id: Date.now(),
      username: "tu_cuenta",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Traveler",
      location,
      image,
      likes: 0,
      comments: 0,
      caption,
      liked: false,
      saved: false,
      commentList: [],
      editable: true,
    };

    setPosts((prev) => [post, ...prev]);
    setNewPost({ location: "", caption: "", image: "" });
    setShowCreatePost(false);
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

  const saveEditedPost = () => {
    if (!editingPost) return;
    const location = newPost.location.trim();
    const caption = newPost.caption.trim();
    const image = newPost.image.trim();
    if (!location || !caption || !image) return;

    setPosts((prev) =>
      prev.map((post) =>
        post.id === editingPost.id
          ? { ...post, location, caption, image }
          : post
      )
    );
    setEditingPost(null);
    setNewPost({ location: "", caption: "", image: "" });
    setShowCreatePost(false);
  };

  const deletePost = (id: number) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
    setActivePostMenu(null);
  };

  const closePostModal = () => {
    setShowCreatePost(false);
    setEditingPost(null);
    setNewPost({ location: "", caption: "", image: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
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

      {/* Feed */}
      <div className="max-w-2xl mx-auto pb-6">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white mb-6 border-b border-gray-100 last:border-b-0"
          >
            {/* Post Header */}
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
                  onClick={() => setActivePostMenu((current) => current === post.id ? null : post.id)}
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

            {/* Post Image */}
            <div className="w-full aspect-square bg-gray-100">
              <img src={post.image} alt={post.location} className="w-full h-full object-cover" />
            </div>

            {/* Post Actions */}
            <div className="px-4 py-3">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleLike(post.id)}
                    className="transition-colors"
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

              <p className="font-semibold text-sm text-gray-900 mb-1">
                {post.likes.toLocaleString()} me gusta
              </p>
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
                  className="p-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                  aria-label="Publicar comentario"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowCreatePost(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-xl flex items-center justify-center z-40"
      >
        <Plus className="w-6 h-6" />
      </motion.button>

      {showCreatePost && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-purple-100 overflow-hidden"
          >
            <div className="p-4 border-b border-purple-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-purple-600">Nueva publicación</p>
                <h2 className="font-semibold text-slate-900">Comparte tu viaje</h2>
              </div>
              <button
                onClick={closePostModal}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
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
                disabled={!newPost.location.trim() || !newPost.caption.trim() || !newPost.image.trim()}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2.5 rounded-lg text-sm font-medium hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingPost ? "Guardar cambios" : "Publicar"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
