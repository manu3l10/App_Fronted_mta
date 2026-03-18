import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, MapPin, Calendar, DollarSign, Star, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";

interface SavedItinerary {
  id: number;
  destination: string;
  dates: string;
  budget: string;
  image: string;
  rating?: number;
  saved: boolean;
}

export function Itineraries() {
  const navigate = useNavigate();
  const [itineraries, setItineraries] = useState<SavedItinerary[]>([
    {
      id: 1,
      destination: "París, Francia",
      dates: "15-20 Marzo 2026",
      budget: "$1,500 - $2,000",
      image: "https://images.unsplash.com/photo-1642947392578-b37fbd9a4d45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyJTIwc3Vuc2V0fGVufDF8fHx8MTc3Mzc1Mzc5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.8,
      saved: true,
    },
    {
      id: 2,
      destination: "Tokio, Japón",
      dates: "5-12 Abril 2026",
      budget: "$2,000 - $2,800",
      image: "https://images.unsplash.com/photo-1679097844800-b0cb637306ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGphcGFuJTIwc3RyZWV0JTIwbmlnaHR8ZW58MXx8fHwxNzczODA1NjUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.9,
      saved: true,
    },
    {
      id: 3,
      destination: "Colombia",
      dates: "1-8 Junio 2026",
      budget: "$800 - $1,200",
      image: "https://images.unsplash.com/photo-1493925410384-84f842e616fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvbWJpYSUyMGNvZmZlZSUyMG1vdW50YWluc3xlbnwxfHx8fDE3NzM4MDU2NDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.7,
      saved: true,
    },
    {
      id: 4,
      destination: "Barcelona, España",
      dates: "20-25 Mayo 2026",
      budget: "$1,200 - $1,800",
      image: "https://images.unsplash.com/photo-1741304787559-a392853b613b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJjZWxvbmElMjBhcmNoaXRlY3R1cmUlMjBnYXVkaXxlbnwxfHx8fDE3NzM3MTY5NjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.6,
      saved: true,
    },
  ]);

  const deleteItinerary = (id: number) => {
    setItineraries(itineraries.filter((item) => item.id !== id));
  };

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
          <h1 className="font-semibold text-gray-900">Mis Itinerarios</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-4 text-white shadow-lg"
          >
            <p className="text-2xl font-semibold">{itineraries.length}</p>
            <p className="text-sm opacity-90">Itinerarios</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl p-4 text-white shadow-lg"
          >
            <p className="text-2xl font-semibold">12</p>
            <p className="text-sm opacity-90">Destinos</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 text-white shadow-lg"
          >
            <p className="text-2xl font-semibold">45</p>
            <p className="text-sm opacity-90">Días viajados</p>
          </motion.div>
        </div>

        {/* Itineraries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {itineraries.map((itinerary, index) => (
            <motion.div
              key={itinerary.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg border border-white/20 group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={itinerary.image}
                  alt={itinerary.destination}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Delete button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => deleteItinerary(itinerary.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </motion.button>

                {/* Rating */}
                {itinerary.rating && (
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold">{itinerary.rating}</span>
                  </div>
                )}

                {/* Destination */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white font-semibold text-lg">{itinerary.destination}</h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    <span>{itinerary.dates}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <DollarSign className="w-4 h-4 text-pink-600" />
                    <span>{itinerary.budget}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2.5 rounded-lg text-sm font-medium hover:shadow-lg transition-shadow">
                    Ver itinerario
                  </button>
                  <button className="px-4 py-2.5 border border-purple-200 text-purple-600 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors">
                    Editar
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {itineraries.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No hay itinerarios guardados</h3>
            <p className="text-gray-600 mb-6">Comienza a planear tu próximo viaje con nuestro asistente IA</p>
            <button
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-shadow"
            >
              Crear itinerario
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
