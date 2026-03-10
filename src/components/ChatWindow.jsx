import React, { useEffect, useRef, useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "./ThemeContext"; // Adjust path as needed

const ChatWindow = ({ messages }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom smoothly when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className={`flex-1 p-4 flex flex-col h-full overflow-hidden transition-colors duration-300 ${
      isDarkMode ? "bg-black/40 backdrop-blur-md" : "bg-gray-50"
    }`}>
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto flex flex-col space-y-4 pr-2 custom-scrollbar"
      >
        {messages.length === 0 ? (
          <div className={`flex-1 flex items-center justify-center italic ${
            isDarkMode ? "text-gray-600" : "text-gray-400"
          }`}>
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((msg, index) => {
            const isMe = msg.from === "me";
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`max-w-[75%] p-3 rounded-2xl text-sm shadow-sm ${
                  isMe 
                    ? "bg-purple-600 text-white self-end rounded-tr-none shadow-[0_4px_12px_rgba(168,85,247,0.2)]" 
                    : isDarkMode 
                      ? "bg-zinc-800 text-gray-100 self-start rounded-tl-none border border-white/5" 
                      : "bg-white text-gray-800 self-start rounded-tl-none border border-gray-200"
                }`}
              >
                <p className="leading-relaxed">{msg.text}</p>
                {msg.time && (
                  <span className={`text-[10px] block mt-1 text-right ${
                    isMe ? "opacity-70" : "opacity-50"
                  }`}>
                    {msg.time}
                  </span>
                )}
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ChatWindow;