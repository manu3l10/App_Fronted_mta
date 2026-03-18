import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ChevronLeft, ChevronRight, MapPin, Clock } from "lucide-react";
import { useNavigate } from "react-router";

interface TripEvent {
  id: number;
  destination: string;
  dates: string;
  image: string;
  color: string;
}

export function Calendar() {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState("Marzo 2026");

  const upcomingTrips: TripEvent[] = [
    {
      id: 1,
      destination: "París, Francia",
      dates: "15-20 Marzo",
      image: "https://images.unsplash.com/photo-1642947392578-b37fbd9a4d45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyJTIwc3Vuc2V0fGVufDF8fHx8MTc3Mzc1Mzc5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "purple",
    },
    {
      id: 2,
      destination: "Tokio, Japón",
      dates: "5-12 Abril",
      image: "https://images.unsplash.com/photo-1679097844800-b0cb637306ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGphcGFuJTIwc3RyZWV0JTIwbmlnaHR8ZW58MXx8fHwxNzczODA1NjUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "pink",
    },
    {
      id: 3,
      destination: "Barcelona, España",
      dates: "20-25 Mayo",
      image: "https://images.unsplash.com/photo-1741304787559-a392853b613b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJjZWxvbmElMjBhcmNoaXRlY3R1cmUlMjBnYXVkaXxlbnwxfHx8fDE3NzM3MTY5NjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "blue",
    },
  ];

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const firstDayOffset = 2; // March 2026 starts on Sunday (offset for layout)

  // Days with trips (for highlighting)
  const tripDays = [15, 16, 17, 18, 19, 20];

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
          <h1 className="font-semibold text-gray-900">Calendario de Viajes</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6 mb-6"
        >
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <button className="p-2 hover:bg-purple-100/50 rounded-lg transition-colors">
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <h2 className="font-semibold text-gray-900">{currentMonth}</h2>
            <button className="p-2 hover:bg-purple-100/50 rounded-lg transition-colors">
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Days of week */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Empty cells for offset */}
            {Array.from({ length: firstDayOffset }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {/* Days */}
            {daysInMonth.map((day) => {
              const hasTrip = tripDays.includes(day);
              return (
                <motion.button
                  key={day}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
                    hasTrip
                      ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg"
                      : day === 18
                      ? "bg-purple-100 text-purple-900 border-2 border-purple-500"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {day}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Upcoming Trips */}
        <div>
          <h2 className="font-semibold text-gray-900 mb-4">Próximos Viajes</h2>
          <div className="space-y-4">
            {upcomingTrips.map((trip, index) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg border border-white/20"
              >
                <div className="flex">
                  {/* Image */}
                  <div className="w-32 h-32 flex-shrink-0">
                    <img src={trip.image} alt={trip.destination} className="w-full h-full object-cover" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className={`w-4 h-4 text-${trip.color}-600`} />
                        <h3 className="font-semibold text-gray-900">{trip.destination}</h3>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{trip.dates}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-3">
                      <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-shadow">
                        Ver detalles
                      </button>
                      <button className="px-4 py-2 border border-purple-200 text-purple-600 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors">
                        Editar
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
