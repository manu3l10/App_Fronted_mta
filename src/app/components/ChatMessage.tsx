import { motion } from "motion/react";
import { Bot, User } from "lucide-react";
import { ReactNode } from "react";

interface ChatMessageProps {
  type: "user" | "ai";
  content: string;
  card?: ReactNode;
}

export function ChatMessage({ type, content, card }: ChatMessageProps) {
  const isUser = type === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}
    >
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center relative ${
          isUser
            ? "bg-gradient-to-br from-purple-500 to-pink-500"
            : "bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600"
        }`}
      >
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Bot className="w-5 h-5 text-white" />
        )}
        {/* Glow effect */}
        <div className={`absolute -inset-1 rounded-full blur-md opacity-50 ${
          isUser ? "bg-purple-500" : "bg-blue-500"
        }`} />
      </div>

      {/* Message */}
      <div className={`flex-1 max-w-[75%] ${isUser ? "flex justify-end" : ""}`}>
        <div className="space-y-3">
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className={`rounded-2xl p-4 relative ${
              isUser
                ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30"
                : "bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-lg"
            }`}
          >
            <p className="text-sm leading-relaxed">{content}</p>
          </motion.div>

          {/* Optional card content */}
          {card && <div className="mt-3">{card}</div>}
        </div>
      </div>
    </motion.div>
  );
}