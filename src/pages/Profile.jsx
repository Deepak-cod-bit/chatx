import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, Settings, Shield, User, Camera, Bell } from "lucide-react";

const Profile = ({ user, setUser }) => {
  const [activeTab, setActiveTab] = useState("info");

  const handleLogout = () => {
    // In your App.js, setUser(null) triggers the redirect to Login
    setUser(null);
  };

  return (
    <div className="flex justify-center items-center min-h-[90vh] p-6">
      <Tilt
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        perspective={1200}
        scale={1.01}
        className="parallax-effect"
      >
        <div className="bg-[#111] border border-white/10 p-8 rounded-3xl shadow-2xl text-white w-96 backdrop-blur-md relative overflow-hidden">
          {/* Animated Background Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600/20 blur-[100px]" />
          
          {/* Profile Header */}
          <div className="relative group mx-auto w-28 h-28 mb-6">
            <div className="w-full h-full bg-black rounded-full border-4 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center justify-center text-4xl font-bold overflow-hidden">
              {/* If no image, show Initial */}
              {user?.charAt(0).toUpperCase() || "U"}
            </div>
            <button className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full border-2 border-black hover:bg-purple-500 transition-colors">
              <Camera size={16} />
            </button>
          </div>

          <h2 className="text-3xl font-bold text-center mb-1">{user || "User Name"}</h2>
          <p className="text-purple-400 text-center text-sm font-mono mb-8 uppercase tracking-widest">
            Level 12 • Radar Pro
          </p>

          {/* Navigation Tabs */}
          <div className="flex justify-between border-b border-white/10 mb-6">
            {[
              { id: "info", icon: <User size={18} /> },
              { id: "settings", icon: <Settings size={18} /> },
              { id: "privacy", icon: <Shield size={18} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-2 px-4 transition-all ${
                  activeTab === tab.id ? "text-purple-500 border-b-2 border-purple-500" : "text-gray-500"
                }`}
              >
                {tab.icon}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="h-48 overflow-y-auto custom-scrollbar pr-2">
            <AnimatePresence mode="wait">
              {activeTab === "info" && (
                <motion.div
                  key="info"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-4"
                >
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Join Date</span>
                    <span className="text-gray-100">March 2024</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Total Chats</span>
                    <span className="text-gray-100">1,284</span>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-xs text-gray-400">
                    "Web developer and tech enthusiast. Always on the radar."
                  </div>
                </motion.div>
              )}

              {activeTab === "settings" && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Ghost Mode</span>
                    <input type="checkbox" className="accent-purple-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Notifications</span>
                    <input type="checkbox" defaultChecked className="accent-purple-600" />
                  </div>
                </motion.div>
              )}

              {activeTab === "privacy" && (
                <motion.div
                  key="privacy"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-3"
                >
                  <button className="w-full text-left text-sm p-2 hover:bg-white/5 rounded-lg transition-colors">
                    Change Password
                  </button>
                  <button className="w-full text-left text-sm p-2 hover:bg-white/5 rounded-lg transition-colors">
                    Blocked Users
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full mt-8 flex items-center justify-center gap-2 bg-red-500/10 text-red-500 border border-red-500/20 py-3 rounded-xl hover:bg-red-500 hover:text-white transition-all font-bold"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </Tilt>
    </div>
  );
};

export default Profile;