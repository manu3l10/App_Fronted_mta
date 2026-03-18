import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Heart, MessageCircle, Bookmark, MoreHorizontal, MapPin, Plus } from "lucide-react";
import { useNavigate } from "react-router";

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
    },
  ]);

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
          <button className="p-2 hover:bg-purple-100/50 rounded-lg transition-colors">
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
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <MoreHorizontal className="w-5 h-5 text-gray-600" />
              </button>
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
                  <button className="hover:text-purple-600 transition-colors">
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
                <button className="text-sm text-gray-500 mt-2">
                  Ver los {post.comments} comentarios
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-xl flex items-center justify-center z-40"
      >
        <Plus className="w-6 h-6" />
      </motion.button>
    </div>
  );
}
