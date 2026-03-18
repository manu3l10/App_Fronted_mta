import { motion } from "motion/react";
import { MapPin, Clock, Star, ChefHat } from "lucide-react";

interface RestaurantCardProps {
  name: string;
  cuisine: string;
  location: string;
  rating: number;
  hours: string;
  image: string;
}

export function RestaurantCard({ name, cuisine, location, rating, hours, image }: RestaurantCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl border border-white/20"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1.5 rounded-full flex items-center gap-1 text-sm font-medium shadow-lg shadow-purple-500/50">
          <ChefHat className="w-3.5 h-3.5" />
          <span>{cuisine}</span>
        </div>
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold text-sm">{rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h4 className="font-semibold text-white mb-2">{name}</h4>
        
        <div className="space-y-1.5 mb-3">
          <div className="flex items-center gap-1.5 text-gray-300 text-sm">
            <MapPin className="w-3.5 h-3.5" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-300 text-sm">
            <Clock className="w-3.5 h-3.5" />
            <span>{hours}</span>
          </div>
        </div>

        <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2.5 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all">
          Reservar mesa
        </button>
      </div>
    </motion.div>
  );
}