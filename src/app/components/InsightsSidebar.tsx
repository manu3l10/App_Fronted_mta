import { motion } from "motion/react";
import { TrendingUp, MapPin, DollarSign, Users, Sparkles } from "lucide-react";

export function InsightsSidebar() {
  const insights = [
    {
      icon: TrendingUp,
      title: "Tendencia",
      description: "París es el destino más buscado este mes",
      color: "from-purple-500 to-purple-600",
      glow: "bg-purple-500/20",
    },
    {
      icon: MapPin,
      title: "Recomendado",
      description: "5 destinos perfectos para primavera",
      color: "from-pink-500 to-pink-600",
      glow: "bg-pink-500/20",
    },
    {
      icon: DollarSign,
      title: "Ofertas",
      description: "Ahorra hasta 40% en vuelos a Asia",
      color: "from-blue-500 to-blue-600",
      glow: "bg-blue-500/20",
    },
  ];

  const popularDestinations = [
    {
      name: "París",
      country: "Francia",
      image: "https://images.unsplash.com/photo-1642947392578-b37fbd9a4d45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyJTIwc3Vuc2V0fGVufDF8fHx8MTc3Mzc1Mzc5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      travelers: "2.4k",
    },
    {
      name: "Tokio",
      country: "Japón",
      image: "https://images.unsplash.com/photo-1679097844800-b0cb637306ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGphcGFuJTIwc3RyZWV0JTIwbmlnaHR8ZW58MXx8fHwxNzczODA1NjUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      travelers: "1.8k",
    },
    {
      name: "Barcelona",
      country: "España",
      image: "https://images.unsplash.com/photo-1741304787559-a392853b613b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJjZWxvbmElMjBhcmNoaXRlY3R1cmUlMjBnYXVkaXxlbnwxfHx8fDE3NzM3MTY5NjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      travelers: "1.5k",
    },
  ];

  return (
    <div className="h-full overflow-y-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-purple-400" />
        <h2 className="font-semibold text-white">Insights</h2>
      </div>

      {/* Insight Cards */}
      <div className="space-y-3">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="relative group cursor-pointer"
            >
              {/* Glow effect on hover */}
              <div className={`absolute -inset-0.5 ${insight.glow} rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${insight.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-white mb-1">{insight.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">{insight.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Popular Destinations */}
      <div className="pt-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white">Destinos Populares</h3>
          <button className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
            Ver todos
          </button>
        </div>

        <div className="space-y-3">
          {popularDestinations.map((dest, index) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group cursor-pointer"
            >
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3 p-3">
                  {/* Image */}
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-white truncate">{dest.name}</h4>
                    <p className="text-xs text-gray-400">{dest.country}</p>
                  </div>

                  {/* Travelers */}
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Users className="w-3.5 h-3.5" />
                    <span>{dest.travelers}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-xl border border-white/10 rounded-xl p-4"
      >
        <h3 className="text-sm font-semibold text-white mb-3">Tus estadísticas</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-2xl font-bold text-white">12</p>
            <p className="text-xs text-gray-400">Países visitados</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">28</p>
            <p className="text-xs text-gray-400">Viajes totales</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
