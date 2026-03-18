import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Sparkles, Mic } from "lucide-react";
import { ChatMessage } from "./ChatMessage";
import { ItineraryCard } from "./ItineraryCard";
import { HotelCard } from "./HotelCard";
import { RestaurantCard } from "./RestaurantCard";
import { MapPreview } from "./MapPreview";

export function AIChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([
    {
      type: "ai",
      content: "✨ Hola, soy tu asistente personal de viajes. ¿A dónde te gustaría viajar?",
    },
  ]);

  const suggestions = [
    "Viaje de 5 días a París",
    "Plan barato en Colombia",
    "Viaje romántico",
    "Aventura en Tokio",
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { type: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      let aiResponse: any = {
        type: "ai",
        content: "¡Perfecto! He creado un itinerario personalizado para ti:",
      };

      if (input.toLowerCase().includes("parís") || input.toLowerCase().includes("paris")) {
        aiResponse.card = (
          <div className="space-y-4">
            <ItineraryCard
              destination="París, Francia"
              duration="5 días"
              budget="$1,500 - $2,000"
              days={[
                {
                  day: 1,
                  title: "Llegada y Torre Eiffel",
                  time: "Todo el día",
                  activities: [
                    "Check-in en el hotel",
                    "Visita a la Torre Eiffel al atardecer",
                    "Cena en restaurante local",
                  ],
                },
                {
                  day: 2,
                  title: "Louvre y Champs-Élysées",
                  time: "9:00 - 20:00",
                  activities: [
                    "Museo del Louvre (Mona Lisa)",
                    "Paseo por Jardín de las Tullerías",
                    "Shopping en Champs-Élysées",
                  ],
                },
                {
                  day: 3,
                  title: "Montmartre y Sacré-Cœur",
                  time: "10:00 - 19:00",
                  activities: [
                    "Barrio de Montmartre",
                    "Basílica del Sacré-Cœur",
                    "Place du Tertre (artistas)",
                  ],
                },
              ]}
            />
            <MapPreview location="París, Francia" coordinates="48.8566° N, 2.3522° E" />
          </div>
        );
      } else if (input.toLowerCase().includes("colombia")) {
        aiResponse.card = (
          <ItineraryCard
            destination="Colombia"
            duration="7 días"
            budget="$800 - $1,200"
            days={[
              {
                day: 1,
                title: "Bogotá - Centro Histórico",
                time: "Todo el día",
                activities: ["La Candelaria", "Museo del Oro", "Cerro de Monserrate"],
              },
              {
                day: 2,
                title: "Eje Cafetero",
                time: "8:00 - 18:00",
                activities: ["Tour cafetero", "Valle de Cocora", "Pueblos típicos"],
              },
            ]}
          />
        );
      }

      setMessages((prev) => [...prev, aiResponse]);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            type: "ai",
            content: "También te recomiendo estos hoteles y restaurantes:",
            card: (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <HotelCard
                  name="Le Grand Hotel"
                  location="Centro de París"
                  rating={4.8}
                  price="$250"
                  image="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzczNzIxNzU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  amenities={["wifi", "breakfast", "gym"]}
                />
                <RestaurantCard
                  name="Le Petit Bistro"
                  cuisine="Francesa"
                  location="Barrio Latino"
                  rating={4.6}
                  hours="12:00 - 23:00"
                  image="https://images.unsplash.com/photo-1717158776685-d4b7c346e1a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMHBsYXR0ZXJ8ZW58MXx8fHwxNzczNjg1NDc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                />
              </div>
            ),
          },
        ]);
      }, 1000);
    }, 1000);

    setInput("");
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="flex-shrink-0 px-6 py-4 border-b border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center"
          >
            <Sparkles className="w-5 h-5 text-white" />
          </motion.div>
          <div>
            <h2 className="font-semibold text-white">Asistente IA</h2>
            <p className="text-xs text-gray-400">Siempre listo para ayudarte</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            type={message.type}
            content={message.content}
            card={message.card}
          />
        ))}
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 px-6 py-4 border-t border-white/10 bg-white/5 backdrop-blur-xl">
        {/* Suggestions */}
        <AnimatePresence>
          {messages.length <= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mb-4 flex flex-wrap gap-2"
            >
              {suggestions.map((suggestion, index) => (
                <motion.button
                  key={suggestion}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleSuggestionClick(suggestion)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-sm font-medium text-white transition-all"
                >
                  {suggestion}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input */}
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Cuéntame tu plan de viaje..."
            className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          />
          
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Mic className="w-5 h-5 text-gray-400" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              disabled={!input.trim()}
              className="p-3 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
            >
              <Send className="w-5 h-5 text-white" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
