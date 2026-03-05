import React from "react";
import { motion } from "framer-motion";

const ChatList = ({ chats }) => (
  <div className="w-1/4 bg-blackbg border border-gray-800 p-4 rounded-xl overflow-y-auto scrollbar-thin scrollbar-thumb-darkgreen">
    <h3 className="text-darkviolet font-bold mb-4">Messages</h3>
    {chats.map((chat, index) => (
      <motion.div
        key={index}
        className="p-3 mb-3 rounded-lg hover:bg-darkgreen/30 border border-transparent hover:border-darkgreen cursor-pointer transition-colors"
        whileHover={{ x: 5 }}
      >
        <div className="font-medium">{chat.name}</div>
        <div className="text-xs text-gray-400">{chat.status}</div>
      </motion.div>
    ))}
  </div>
);

export default ChatList;