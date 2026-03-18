import { motion } from "motion/react";
import { MapPin, Clock, DollarSign } from "lucide-react";

interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
  time: string;
}

interface ItineraryCardProps {
  destination: string;
  duration: string;
  budget: string;
  days: ItineraryDay[];
}

export function ItineraryCard({ destination, duration, budget, days }: ItineraryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl"
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">{destination}</h3>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-purple-300">
                <Clock className="w-4 h-4" />
                <span>{duration}</span>
              </div>
              <div className="flex items-center gap-1 text-pink-300">
                <DollarSign className="w-4 h-4" />
                <span>{budget}</span>
              </div>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
            <MapPin className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {days.map((day, index) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            {/* Timeline line */}
            {index < days.length - 1 && (
              <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-gradient-to-b from-purple-400 to-pink-400" />
            )}

            <div className="flex gap-4">
              {/* Day badge */}
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-semibold z-10 shadow-lg shadow-purple-500/50">
                {day.day}
              </div>

              {/* Content */}
              <div className="flex-1 pb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/10 hover:bg-white/15 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-white">{day.title}</h4>
                    <span className="text-xs text-gray-400">{day.time}</span>
                  </div>
                  <ul className="space-y-1">
                    {day.activities.map((activity, i) => (
                      <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                        <span className="text-purple-400 mt-1">•</span>
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}