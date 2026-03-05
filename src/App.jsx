import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ChatList from "./components/ChatList";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

function App() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState({});
  const [activeChat, setActiveChat] = useState(null); // Current chat user

  const chats = [
    { name: "Alice", status: "Online" },
    { name: "Bob", status: "Away" },
    { name: "Charlie", status: "Offline" }
  ];

  const sendMessage = (text) => {
    if (!activeChat) return;
    setMessages(prev => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), { text, from: "me" }]
    }));
  };

  const handleLogin = (username) => {
    setUser(username);
  };

  return (
    <Router>
      <div className="bg-blackbg min-h-screen text-white font-sans flex flex-col">
        {user && <Navbar />}
        <main className="flex-1">
          <Routes>
            {/* Login */}
            {!user && <Route path="*" element={<Login onLogin={handleLogin} />} />}

            {/* Protected Routes */}
            {user && (
              <>
                {/* Home page with pass to set active chat */}
                <Route path="/" element={<Home setActiveChat={setActiveChat} />} />

                {/* Chat page */}
                <Route path="/chat" element={
                  <div className="flex p-4 space-x-4 h-[calc(100vh-80px)]">
                    <ChatList chats={chats} setActiveChat={setActiveChat} />
                    <div className="flex-1 flex flex-col">
                      <ChatWindow messages={messages[activeChat] || []} />
                      <MessageInput sendMessage={sendMessage} />
                    </div>
                  </div>
                } />

                <Route path="/profile" element={<Profile />} />

                <Route path="*" element={<Navigate to="/" />} />
              </>
            )}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;