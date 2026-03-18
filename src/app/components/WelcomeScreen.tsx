import { motion } from "motion/react";
import { Plane, Sparkles } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      {/* Animated background stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Planet Earth */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-1/4 right-1/4 w-64 h-64"
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 via-green-400 to-blue-600 opacity-90" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-transparent to-white/20" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 30 Q 30 25, 40 30 T 60 30' stroke='rgba(255,255,255,0.1)' fill='none'/%3E%3Cpath d='M10 50 Q 25 45, 40 50 T 70 50' stroke='rgba(255,255,255,0.1)' fill='none'/%3E%3C/svg%3E")`,
            }}
          />
          {/* Earth glow */}
          <div className="absolute -inset-4 rounded-full bg-blue-500/30 blur-xl" />
        </div>
      </motion.div>

      {/* Animated Plane */}
      <motion.div
        initial={{ x: "-100%", y: "100%", opacity: 0 }}
        animate={{ 
          x: ["0%", "120%"],
          y: ["0%", "-20%"],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 6,
          times: [0, 0.1, 0.9, 1],
          repeat: Infinity,
          repeatDelay: 3,
        }}
        className="absolute top-1/2 left-0"
      >
        <div className="relative">
          <Plane className="w-12 h-12 text-white transform rotate-45" />
          <motion.div
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute -inset-2 bg-white/20 rounded-full blur-md"
          />
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          {/* AI Avatar */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
            className="relative mx-auto mb-8"
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center relative">
              <Sparkles className="w-16 h-16 text-white" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-white/30"
              />
              <div className="absolute -inset-4 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full blur-2xl" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              AI Travel Assistant
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-3">
              Tu compañero inteligente de viajes
            </p>
            <p className="text-gray-400 max-w-md mx-auto mb-12">
              Descubre destinos increíbles, planifica itinerarios perfectos y vive experiencias inolvidables con el poder de la inteligencia artificial
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="group relative px-12 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full font-semibold text-white text-lg overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
            <span className="relative flex items-center gap-2">
              Comenzar viaje
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </motion.button>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-400"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <span>Itinerarios personalizados</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-pink-500" />
              <span>Recomendaciones inteligentes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span>Comunidad global</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
