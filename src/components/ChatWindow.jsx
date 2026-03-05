import React from "react";
import { motion } from "framer-motion";

const ChatWindow = ({ messages }) => (
  <div className="flex-1 bg-blackbg border border-gray-800 p-4 rounded-xl flex flex-col overflow-hidden">
    <div className="flex-1 overflow-y-auto flex flex-col space-y-3 scrollbar-thin scrollbar-thumb-darkgreen">
      {messages.map((msg, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`max-w-[70%] p-3 rounded-2xl ${
            msg.from === "me" 
              ? "bg-darkgreen self-end rounded-tr-none" 
              : "bg-darkviolet self-start rounded-tl-none"
          }`}
        >
          {msg.text}
        </motion.div>
      ))}
    </div>
  </div>
);

export default ChatWindow;