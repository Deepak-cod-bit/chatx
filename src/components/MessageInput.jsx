import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const MessageInput = ({ sendMessage }) => {
  const [text, setText] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (text.trim()) {
      sendMessage(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSend} className="flex p-2 mt-2 gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 p-3 rounded-lg bg-blackbg border border-darkgreen focus:outline-none focus:ring-1 focus:ring-darkviolet text-white"
        placeholder="Type a message..."
      />
      <button type="submit" className="p-4 bg-darkgreen rounded-lg hover:bg-darkviolet transition-colors">
        <FaPaperPlane />
      </button>
    </form>
  );
};

export default MessageInput;