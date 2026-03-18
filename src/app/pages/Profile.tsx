import { motion } from "motion/react";
import { ArrowLeft, MapPin, Calendar, Award, Camera, Edit, LogOut } from "lucide-react";
import { useNavigate } from "react-router";

export function Profile() {
  const navigate = useNavigate();

  const stats = [
    { label: "Países visitados", value: "12", icon: MapPin },
    { label: "Viajes realizados", value: "28", icon: Calendar },
    { label: "Insignias", value: "15", icon: Award },
  ];

  const badges = [
    { name: "Viajero Frecuente", icon: "✈️", color: "from-purple-500 to-purple-600" },
    { name: "Explorador", icon: "🗺️", color: "from-blue-500 to-blue-600" },
    { name: "Foodie", icon: "🍕", color: "from-orange-500 to-orange-600" },
    { name: "Aventurero", icon: "🏔️", color: "from-green-500 to-green-600" },
    { name: "Fotógrafo", icon: "📸", color: "from-pink-500 to-pink-600" },
    { name: "Culturalista", icon: "🎭", color: "from-indigo-500 to-indigo-600" },
  ];

  const recentTrips = [
    {
      destination: "París, Francia",
      date: "Marzo 2026",
      image: "https://images.unsplash.com/photo-1642947392578-b37fbd9a4d45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyJTIwc3Vuc2V0fGVufDF8fHx8MTc3Mzc1Mzc5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      destination: "Tokio, Japón",
      date: "Febrero 2026",
      image: "https://images.unsplash.com/photo-1679097844800-b0cb637306ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGphcGFuJTIwc3RyZWV0JTIwbmlnaHR8ZW58MXx8fHwxNzczODA1NjUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      destination: "Colombia",
      date: "Enero 2026",
      image: "https://images.unsplash.com/photo-1493925410384-84f842e616fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvbWJpYSUyMGNvZmZlZSUyMG1vdW50YWluc3xlbnwxfHx8fDE3NzM4MDU2NDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-purple-100/50 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="font-semibold text-gray-900">Perfil</h1>
          <button className="p-2 hover:bg-purple-100/50 rounded-lg transition-colors">
            <Edit className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6 mb-6"
        >
          <div className="flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl font-semibold">
                V
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-purple-200 hover:bg-purple-50 transition-colors">
                <Camera className="w-4 h-4 text-purple-600" />
              </button>
            </div>

            {/* Name */}
            <h2 className="text-2xl font-semibold text-gray-900 mb-1">Viajero Apasionado</h2>
            <p className="text-gray-600 mb-4">@traveler</p>

            {/* Bio */}
            <p className="text-gray-700 max-w-md mb-6">
              ✈️ Amante de los viajes y las aventuras. Explorando el mundo un destino a la vez 🌍
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 w-full">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4"
                  >
                    <Icon className="w-5 h-5 text-purple-600 mx-auto mb-2" />
                    <p className="text-2xl font-semibold text-gray-900 mb-1">{stat.value}</p>
                    <p className="text-xs text-gray-600">{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6 mb-6"
        >
          <h3 className="font-semibold text-gray-900 mb-4">Insignias</h3>
          <div className="grid grid-cols-3 gap-3">
            {badges.map((badge, index) => (
              <motion.div
                key={badge.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className={`bg-gradient-to-br ${badge.color} rounded-xl p-4 text-center text-white shadow-lg`}
              >
                <div className="text-3xl mb-2">{badge.icon}</div>
                <p className="text-xs font-medium">{badge.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Trips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6 mb-6"
        >
          <h3 className="font-semibold text-gray-900 mb-4">Viajes Recientes</h3>
          <div className="grid grid-cols-3 gap-3">
            {recentTrips.map((trip, index) => (
              <motion.div
                key={trip.destination}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden mb-2">
                  <img
                    src={trip.image}
                    alt={trip.destination}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm font-medium text-gray-900">{trip.destination}</p>
                <p className="text-xs text-gray-500">{trip.date}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-3"
        >
          <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-shadow">
            Editar Perfil
          </button>
          <button className="w-full flex items-center justify-center gap-2 bg-white/80 backdrop-blur-xl border border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-white transition-colors">
            <LogOut className="w-5 h-5" />
            Cerrar sesión
          </button>
        </motion.div>
      </div>
    </div>
  );
}
