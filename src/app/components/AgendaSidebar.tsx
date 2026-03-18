import { motion } from "motion/react";
import { Calendar, Clock, MapPin, ChevronRight } from "lucide-react";

export function AgendaSidebar() {
  const today = new Date();
  const currentMonth = today.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  const currentDay = today.getDate();

  const upcomingEvents = [
    {
      id: 1,
      title: "Vuelo a París",
      date: "15 Mar",
      time: "14:30",
      type: "flight",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: 2,
      title: "Check-in Hotel",
      date: "15 Mar",
      time: "18:00",
      type: "hotel",
      color: "from-pink-500 to-pink-600",
    },
    {
      id: 3,
      title: "Torre Eiffel",
      date: "16 Mar",
      time: "10:00",
      type: "activity",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: 4,
      title: "Museo del Louvre",
      date: "17 Mar",
      time: "09:00",
      type: "activity",
      color: "from-cyan-500 to-cyan-600",
    },
  ];

  const miniCalendarDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return {
      day: date.getDate(),
      weekday: date.toLocaleDateString('es-ES', { weekday: 'short' }),
      isToday: i === 0,
    };
  });

  return (
    <div className="h-full overflow-y-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-5 h-5 text-blue-400" />
        <h2 className="font-semibold text-white">Agenda</h2>
      </div>

      {/* Mini Calendar Week View */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4"
      >
        <p className="text-xs text-gray-400 mb-3 capitalize">{currentMonth}</p>
        <div className="grid grid-cols-7 gap-2">
          {miniCalendarDays.map((day, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`text-center ${
                day.isToday
                  ? "bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg p-2"
                  : "p-2"
              }`}
            >
              <p className={`text-[10px] uppercase mb-1 ${
                day.isToday ? "text-white" : "text-gray-500"
              }`}>
                {day.weekday}
              </p>
              <p className={`text-sm font-semibold ${
                day.isToday ? "text-white" : "text-gray-300"
              }`}>
                {day.day}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Upcoming Events */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white">Próximos eventos</h3>
          <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
            Ver todos
          </button>
        </div>

        <div className="space-y-3">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group cursor-pointer"
            >
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-3 hover:bg-white/10 transition-colors">
                {/* Colored indicator */}
                <div className={`absolute left-0 top-3 bottom-3 w-1 bg-gradient-to-b ${event.color} rounded-r-full`} />
                
                <div className="pl-3">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-semibold text-white pr-2">{event.title}</h4>
                    <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0 group-hover:text-gray-300 transition-colors" />
                  </div>
                  
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{event.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Weather Widget */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl border border-white/10 rounded-xl p-4"
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-gray-400 mb-1">París, Francia</p>
            <p className="text-2xl font-bold text-white">22°C</p>
          </div>
          <div className="text-4xl">☀️</div>
        </div>
        <p className="text-xs text-gray-400">Soleado, perfecto para explorar</p>
      </motion.div>

      {/* Travel Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/20 rounded-xl p-4"
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
            💡
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-1">Consejo del día</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Reserva tus entradas a museos con anticipación para evitar filas
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
