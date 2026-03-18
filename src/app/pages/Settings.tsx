import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Bell,
  Globe,
  Moon,
  Shield,
  CreditCard,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router";

export function Settings() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const settingsSections = [
    {
      title: "Cuenta",
      items: [
        { icon: Globe, label: "Idioma", value: "Español", action: true },
        { icon: Bell, label: "Notificaciones", toggle: true, state: notifications, setState: setNotifications },
        { icon: Moon, label: "Modo oscuro", toggle: true, state: darkMode, setState: setDarkMode },
      ],
    },
    {
      title: "Privacidad y Seguridad",
      items: [
        { icon: Shield, label: "Privacidad", action: true },
        { icon: CreditCard, label: "Métodos de pago", action: true },
      ],
    },
    {
      title: "Soporte",
      items: [
        { icon: HelpCircle, label: "Centro de ayuda", action: true },
      ],
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
          <h1 className="font-semibold text-gray-900">Configuración</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {settingsSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
            className="mb-6"
          >
            <h2 className="font-semibold text-gray-900 mb-3 px-2">{section.title}</h2>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 overflow-hidden">
              {section.items.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className={`flex items-center justify-between p-4 hover:bg-purple-50/50 transition-colors ${
                      index < section.items.length - 1 ? "border-b border-gray-100" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-purple-600" />
                      </div>
                      <span className="font-medium text-gray-900">{item.label}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.toggle && item.setState ? (
                        <button
                          onClick={() => item.setState(!item.state)}
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            item.state
                              ? "bg-gradient-to-r from-purple-500 to-pink-500"
                              : "bg-gray-300"
                          }`}
                        >
                          <motion.div
                            animate={{ x: item.state ? 24 : 2 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                          />
                        </button>
                      ) : item.action ? (
                        <>
                          {item.value && (
                            <span className="text-sm text-gray-500 mr-2">{item.value}</span>
                          )}
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}

        {/* App Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-semibold mx-auto mb-3">
            AI
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">AI Travel Assistant</h3>
          <p className="text-sm text-gray-600 mb-1">Versión 1.0.0</p>
          <p className="text-xs text-gray-500">© 2026 AI Travel Assistant</p>
        </motion.div>
      </div>
    </div>
  );
}
