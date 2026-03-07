import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import ChatList from "./components/ChatList";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";

// Pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

// Global Styles
import "leaflet/dist/leaflet.css";

function App() {
  // State for Auth and Data
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState({});
  const [activeChat, setActiveChat] = useState(null);

  // Mock Data for Contacts
  const chats = [
    { name: "Alice", status: "Online" },
    { name: "Bob", status: "Away" },
    { name: "Charlie", status: "Offline" }
  ];

  // Logic to handle sending messages
  const sendMessage = (text) => {
    if (!activeChat) return;
    setMessages(prev => ({
      ...prev,
      [activeChat]: [
        ...(prev[activeChat] || []), 
        { 
          text, 
          from: "me", 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        }
      ]
    }));
  };

  // Logic to handle user login
  const handleLogin = (username) => {
    setUser(username);
  };

  return (
    <Router>
      <div className="bg-[#0b0b0b] min-h-screen text-white font-sans flex flex-col">
        {/* Only show Navbar if a user is logged in */}
        {user && <Navbar />}

        <main className="flex-1 overflow-hidden">
          <Routes>
            {/* 1. AUTH GUARD: If no user, show Login for all paths */}
            {!user ? (
              <Route path="*" element={<Login onLogin={handleLogin} />} />
            ) : (
              <>
                {/* 2. HOME ROUTE */}
                <Route 
                  path="/" 
                  element={<Home setActiveChat={setActiveChat} />} 
                />

                {/* 3. CHAT ROUTE */}
                <Route path="/chat" element={
                  <div className="flex p-4 gap-4 h-[calc(100vh-80px)] max-w-7xl mx-auto w-full">
                    {/* Sidebar */}
                    <div className="w-1/3 lg:w-1/4 bg-[#1a1a1a] rounded-2xl border border-white/10 overflow-hidden">
                      <ChatList 
                        chats={chats} 
                        setActiveChat={setActiveChat} 
                        activeChat={activeChat} 
                      />
                    </div>

                    {/* Chat Window */}
                    <div className="flex-1 flex flex-col bg-[#1a1a1a] rounded-2xl border border-white/10 overflow-hidden relative">
                      {activeChat ? (
                        <>
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
                          <div className="w-16 h-16 mb-4 rounded-full border-2 border-dashed border-gray-600 flex items-center justify-center text-2xl">
                            💬
                          </div>
                          <p>Select a contact from the radar or the list to start a conversation.</p>
                        </div>
                      )}
                    </div>
                  </div>
                } />

                {/* 4. PROFILE ROUTE: Crucial to pass both user and setUser */}
                <Route 
                  path="/profile" 
                  element={<Profile user={user} setUser={setUser} />} 
                />

                {/* 5. CATCH-ALL REDIRECT */}
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