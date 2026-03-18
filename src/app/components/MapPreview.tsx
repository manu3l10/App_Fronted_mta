import { motion } from "motion/react";
import { MapPin, Navigation } from "lucide-react";

interface MapPreviewProps {
  location: string;
  coordinates?: string;
}

export function MapPreview({ location, coordinates = "48.8566, 2.3522" }: MapPreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl border border-white/20"
    >
      {/* Map placeholder with gradient */}
      <div className="relative h-48 bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200">
        {/* Simulated map markers */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <MapPin className="w-12 h-12 text-purple-600 fill-purple-600 drop-shadow-lg" />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-2 bg-purple-600/30 rounded-full blur-sm" />
          </motion.div>
        </div>

        {/* Grid overlay for map effect */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-8 grid-rows-6 w-full h-full">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border border-gray-600" />
            ))}
          </div>
        </div>

        {/* Coordinates badge */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-gray-700 shadow-lg">
          {coordinates}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-purple-300" />
            <span className="font-semibold text-white">{location}</span>
          </div>
          <button className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all">
            <Navigation className="w-4 h-4" />
            <span>Navegar</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}