import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "./ThemeContext";

const ChatList = ({ chats, setActiveChat, activeChat }) => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={`w-full h-full flex flex-col p-4 transition-colors ${isDarkMode ? "bg-[#121212] text-white" : "bg-white text-gray-900"}`}>
      <h3 className="text-purple-500 font-black mb-6 text-xl tracking-tight">MESSAGES</h3>
      
      <div className="flex flex-col gap-3 overflow-y-auto pr-1">
        {chats.map((chat, index) => (
          <motion.div
            key={index}
            onClick={() => setActiveChat(chat.name)}
            className={`p-4 rounded-2xl cursor-pointer transition-all border ${
              activeChat === chat.name 
                ? (isDarkMode ? "bg-purple-600/20 border-purple-500" : "bg-purple-50 border-purple-400 shadow-sm") 
                : (isDarkMode ? "bg-white/5 border-transparent hover:border-white/10" : "bg-gray-50 border-transparent hover:border-gray-200")
            }`}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex justify-between items-center">
              <span className={`font-bold ${activeChat === chat.name ? "text-purple-500" : ""}`}>
                {chat.name}
              </span>
              <div className={`h-2.5 w-2.5 rounded-full border-2 border-current ${chat.status === 'Online' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
            </div>
            <div className="text-[10px] uppercase tracking-widest text-gray-500 mt-1 font-semibold">
              {chat.status}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;