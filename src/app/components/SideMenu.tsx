import { motion, AnimatePresence } from "motion/react";
import { X, User, Calendar, Camera, Heart, FileText, Settings, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const navigate = useNavigate();

  const menuItems = [
    { icon: User, label: "Perfil", path: "/profile", color: "from-purple-500 to-purple-600" },
    { icon: Calendar, label: "Calendario", path: "/calendar", color: "from-blue-500 to-blue-600" },
    { icon: Camera, label: "Comunidad", path: "/community", color: "from-pink-500 to-pink-600" },
    { icon: FileText, label: "Mis itinerarios", path: "/itineraries", color: "from-cyan-500 to-cyan-600" },
    { icon: Heart, label: "Favoritos", path: "/favorites", color: "from-rose-500 to-rose-600" },
    { icon: Settings, label: "Configuración", path: "/settings", color: "from-slate-500 to-slate-600" },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Menu */}
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-0 top-0 h-full w-80 z-50"
          >
            {/* Glass effect container with dark theme */}
            <div className="h-full bg-gradient-to-br from-slate-900/95 via-purple-900/95 to-slate-900/95 backdrop-blur-2xl border-r border-white/10 shadow-2xl">
              {/* Background effects */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-purple-600/20 rounded-full blur-[80px]" />
                <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-pink-600/20 rounded-full blur-[80px]" />
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Viajero</h3>
                        <p className="text-sm text-gray-400">@traveler</p>
                      </div>
                    </div>
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-300" />
                    </button>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <div className="bg-white/5 rounded-lg p-2 text-center border border-white/10">
                      <p className="text-lg font-semibold text-white">12</p>
                      <p className="text-xs text-gray-400">Países</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 text-center border border-white/10">
                      <p className="text-lg font-semibold text-white">28</p>
                      <p className="text-xs text-gray-400">Viajes</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 text-center border border-white/10">
                      <p className="text-lg font-semibold text-white">15</p>
                      <p className="text-xs text-gray-400">Badges</p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <nav className="flex-1 p-4 overflow-y-auto">
                  {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.button
                        key={item.path}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleNavigation(item.path)}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-white/10 transition-all group mb-2 relative overflow-hidden"
                      >
                        {/* Hover glow effect */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity rounded-xl`} />
                        
                        <div className={`relative w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="relative font-medium text-white">{item.label}</span>
                      </motion.button>
                    );
                  })}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-white/10">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-xl p-4 text-white relative overflow-hidden cursor-pointer"
                  >
                    {/* Animated background */}
                    <motion.div
                      animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                      }}
                      transition={{ duration: 5, repeat: Infinity }}
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-50"
                      style={{ backgroundSize: '200% 200%' }}
                    />
                    
                    <div className="relative">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-5 h-5" />
                        <p className="font-semibold">Premium</p>
                      </div>
                      <p className="text-xs opacity-90">Desbloquea funciones exclusivas</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
