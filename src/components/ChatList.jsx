import React from "react";
import { motion } from "framer-motion";

const ChatList = ({ chats, setActiveChat, activeChat }) => (
  /* Added flex-shrink-0 and min-width to prevent squashing */
  <div className="w-80 flex-shrink-0 bg-black border border-gray-800 p-4 rounded-xl overflow-y-auto h-full">
    <h3 className="text-purple-500 font-bold mb-4 text-xl">Messages</h3>
    <div className="flex flex-col gap-2">
      {chats.map((chat, index) => (
        <motion.div
          key={index}
          onClick={() => setActiveChat(chat.name)}
          className={`p-4 rounded-xl cursor-pointer transition-all border ${
            activeChat === chat.name 
              ? "bg-purple-600/20 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.2)]" 
              : "bg-gray-900/50 border-gray-800 hover:border-gray-600"
          }`}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex justify-between items-center">
            <span className="font-bold text-white">{chat.name}</span>
            <span className={`h-2 w-2 rounded-full ${chat.status === 'Online' ? 'bg-green-500' : 'bg-gray-500'}`}></span>
          </div>
          <div className="text-xs text-gray-400 mt-1">{chat.status}</div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default ChatList;