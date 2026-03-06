import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const ChatWindow = ({ messages }) => {
  const scrollRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex-1 bg-black/40 backdrop-blur-md p-4 flex flex-col h-full overflow-hidden">
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto flex flex-col space-y-4 pr-2 custom-scrollbar"
      >
        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-gray-600 italic">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`max-w-[75%] p-3 rounded-2xl text-sm ${
                msg.from === "me" 
                  ? "bg-purple-600 text-white self-end rounded-tr-none shadow-[0_0_10px_rgba(168,85,247,0.3)]" 
                  : "bg-gray-800 text-gray-100 self-start rounded-tl-none border border-gray-700"
              }`}
            >
              <p>{msg.text}</p>
              {msg.time && (
                <span className="text-[10px] opacity-50 block mt-1 text-right">
                  {msg.time}
                </span>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatWindow;