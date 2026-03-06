import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ChatList from "./components/ChatList";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

// Import Leaflet CSS globally so the map doesn't break
import "leaflet/dist/leaflet.css";

function App() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState({});
  const [activeChat, setActiveChat] = useState(null);

  // This list should match the users on your Map for consistency
  const chats = [
    { name: "Alice", status: "Online" },
    { name: "Bob", status: "Away" },
    { name: "Charlie", status: "Offline" }
  ];

  const sendMessage = (text) => {
    if (!activeChat) return;
    setMessages(prev => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), { text, from: "me", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]
    }));
  };

  const handleLogin = (username) => {
    setUser(username);
  };

  return (
    <Router>
      <div className="bg-[#0b0b0b] min-h-screen text-white font-sans flex flex-col">
        {/* Only show Navbar if logged in */}
        {user && <Navbar />}

        <main className="flex-1 overflow-hidden">
          <Routes>
            {/* Login Logic */}
            {!user ? (
              <Route path="*" element={<Login onLogin={handleLogin} />} />
            ) : (
              <>
                {/* 1. Home Page: Passes setActiveChat to the Map/List */}
                <Route 
                  path="/" 
                  element={<Home setActiveChat={setActiveChat} />} 
                />

                {/* 2. Chat Page: Integrated Sidebar and Window */}
                <Route path="/chat" element={
                  <div className="flex p-4 gap-4 h-[calc(100vh-80px)] max-w-7xl mx-auto w-full">
                    {/* Sidebar: Shows who you can talk to */}
                    <div className="w-1/3 lg:w-1/4 bg-[#1a1a1a] rounded-2xl border border-white/10 overflow-hidden">
                      <ChatList 
                        chats={chats} 
                        setActiveChat={setActiveChat} 
                        activeChat={activeChat} 
                      />
                    </div>

                    {/* Main Chat Area */}
                    <div className="flex-1 flex flex-col bg-[#1a1a1a] rounded-2xl border border-white/10 overflow-hidden relative">
                      {activeChat ? (
                        <>
                          {/* Header for the chat partner */}
                          <div className="p-4 border-b border-white/10 bg-white/5 font-bold text-purple-400">
                            Chatting with {activeChat}
                          </div>
                          
                          <ChatWindow messages={messages[activeChat] || []} />
                          
                          <div className="p-4 bg-black/20">
                            <MessageInput sendMessage={sendMessage} />
                          </div>
                        </>
                      ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-gray-500 p-8 text-center">
                          <div className="w-16 h-16 mb-4 rounded-full border-2 border-dashed border-gray-600 flex items-center justify-center">
                            💬
                          </div>
                          <p>Select a contact from the radar or the list to start a conversation.</p>
                        </div>
                      )}
                    </div>
                  </div>
                } />

                {/* 3. Profile Page */}
                <Route path="/profile" element={<Profile user={user} />} />

                {/* Redirect any unknown routes back home */}
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