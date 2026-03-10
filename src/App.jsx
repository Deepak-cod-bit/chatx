import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

// Components - ADDED ThemeProvider and ThemeContext here
import Navbar from "./components/Navbar";
import ChatList from "./components/ChatList";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";
import { ThemeProvider, ThemeContext } from "./components/ThemeContext"; 

// Styles
import "leaflet/dist/leaflet.css";

function AppContent() {
  // Use the theme state from Context
  const { isDarkMode } = useContext(ThemeContext);
  
  const [user, setUser] = useState(null); 
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState({});

  const chats = [
    { name: "Soumya", status: "Online" },
    { name: "Mahesh", status: "Away" },
    { name: "Ambika", status: "Offline" },
    { name: "Deepak", status: "Online" }
  ];

  const handleLogin = (username) => setUser(username);
  const handleLogout = () => setUser(null);

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

  return (
    // Dynamic background and text colors based on isDarkMode
    <div className={`${isDarkMode ? "bg-[#0b0b0b] text-white" : "bg-gray-100 text-gray-900"} min-h-screen font-sans flex flex-col transition-colors duration-300`}>
      {user && <Navbar onLogout={handleLogout} />}

      <main className="flex-1 overflow-hidden">
        <Routes>
          <Route path="/" element={!user ? <Landing /> : <Navigate to="/radar" />} />
          <Route path="/login" element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/radar" />} />

          {user ? (
            <>
              <Route path="/radar" element={<Home setActiveChat={setActiveChat} />} />
              
              <Route path="/chat" element={
                <div className="flex p-4 gap-4 h-[calc(100vh-80px)] max-w-7xl mx-auto w-full">
                  {/* Chat List Sidebar */}
                  <div className={`w-1/3 lg:w-1/4 rounded-2xl border transition-colors ${isDarkMode ? "bg-[#1a1a1a] border-white/10" : "bg-white border-gray-200 shadow-sm"} overflow-hidden`}>
                    <ChatList chats={chats} setActiveChat={setActiveChat} activeChat={activeChat} />
                  </div>

                  {/* Chat Main Window */}
                  <div className={`flex-1 flex flex-col rounded-2xl border transition-colors ${isDarkMode ? "bg-[#1a1a1a] border-white/10" : "bg-white border-gray-200 shadow-sm"} overflow-hidden relative`}>
                    {activeChat ? (
                      <>
                        <div className={`p-4 border-b font-bold ${isDarkMode ? "border-white/10 bg-white/5 text-purple-400" : "border-gray-200 bg-gray-50 text-purple-600"}`}>
                          Chatting with {activeChat}
                        </div>
                        <ChatWindow messages={messages[activeChat] || []} />
                        <div className="p-4 bg-black/5">
                          <MessageInput sendMessage={sendMessage} />
                        </div>
                      </>
                    ) : (
                      <div className="flex-1 flex justify-center items-center text-gray-500 p-8 text-center">
                        <p>Select a contact to start chatting.</p>
                      </div>
                    )}
                  </div>
                </div>
              } />

              <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
              <Route path="*" element={<Navigate to="/radar" />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </main>
    </div>
  );
}

// Wrap the whole app in the Provider and the Router
export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}