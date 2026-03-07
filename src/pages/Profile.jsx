import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LogOut, Settings, Shield, User, Camera, Bell, 
  MessageSquare, Lock, HardDrive, Smartphone, 
  Battery, Globe, HelpCircle, MessageCircle, 
  ChevronRight, Info, Zap
} from "lucide-react";

const Profile = ({ user, setUser }) => {
  const [activeTab, setActiveTab] = useState("info");

  const handleLogout = () => {
    setUser(null);
  };

  // Helper component for Setting Rows
  const SettingRow = ({ icon: Icon, label, detail }) => (
    <div className="flex items-center justify-between p-3 hover:bg-white/5 rounded-xl cursor-pointer transition-colors group">
      <div className="flex items-center gap-3">
        <div className="text-purple-400 group-hover:text-purple-300 transition-colors">
          <Icon size={18} />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium">{label}</span>
          {detail && <span className="text-[10px] text-gray-500">{detail}</span>}
        </div>
      </div>
      <ChevronRight size={14} className="text-gray-600 group-hover:text-white" />
    </div>
  );

  return (
    <div className="flex justify-center items-center min-h-[90vh] p-6 font-sans">
      <Tilt
        tiltMaxAngleX={8}
        tiltMaxAngleY={8}
        perspective={1500}
        scale={1.02}
        className="parallax-effect"
      >
        <div className="bg-[#0f0f0f] border border-white/10 p-8 rounded-[2rem] shadow-2xl text-white w-[400px] backdrop-blur-xl relative overflow-hidden">
          {/* Background Accents */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-600/20 blur-[80px]" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-600/10 blur-[80px]" />
          
          {/* Profile Header */}
          <div className="relative group mx-auto w-24 h-24 mb-4">
            <div className="w-full h-full bg-gradient-to-tr from-purple-900 to-black rounded-full border-2 border-purple-500/50 flex items-center justify-center text-3xl font-bold shadow-[0_0_30px_rgba(168,85,247,0.2)]">
              {user?.charAt(0).toUpperCase() || "U"}
            </div>
            <button className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full border-2 border-[#0f0f0f] hover:scale-110 transition-transform">
              <Camera size={14} />
            </button>
          </div>

          <h2 className="text-2xl font-bold text-center">{user || "User Name"}</h2>
          <p className="text-purple-400 text-center text-[10px] font-mono mb-6 uppercase tracking-[0.2em]">
            Level 12 • Radar Pro
          </p>

          {/* Navigation Tabs */}
          <div className="flex justify-between border-b border-white/5 mb-4">
            {[
              { id: "info", icon: <User size={18} /> },
              { id: "settings", icon: <Settings size={18} /> },
              { id: "help", icon: <HelpCircle size={18} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 px-6 transition-all relative ${
                  activeTab === tab.id ? "text-purple-500" : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {tab.icon}
                {activeTab === tab.id && (
                  <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500" />
                )}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="h-72 overflow-y-auto custom-scrollbar pr-2 -mr-2">
            <AnimatePresence mode="wait">
              {activeTab === "info" && (
                <motion.div
                  key="info"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4 pt-2"
                >
                  <div className="flex justify-between text-sm bg-white/5 p-3 rounded-xl">
                    <span className="text-gray-400">Total Chats</span>
                    <span className="text-purple-400 font-mono">1,284</span>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <p className="text-xs text-gray-400 italic leading-relaxed">
                      "Web developer and tech enthusiast. Always on the radar."
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === "settings" && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-1"
                >
                  <SettingRow icon={User} label="Account" detail="Security, Email, Phone" />
                  <SettingRow icon={MessageSquare} label="Chat Settings" detail="Theme, Wallpapers" />
                  <SettingRow icon={Lock} label="Privacy & Security" detail="Blocked, Two-step" />
                  <SettingRow icon={Bell} label="Notifications" detail="Alerts & Sounds" />
                  <SettingRow icon={HardDrive} label="Data & Storage" detail="Usage & Auto-download" />
                  <SettingRow icon={Smartphone} label="Devices" detail="Logged in sessions" />
                  <SettingRow icon={Battery} label="Power Saving" detail="Optimizations" />
                  <SettingRow icon={Globe} label="Language" detail="English (US)" />
                </motion.div>
              )}

              {activeTab === "help" && (
                <motion.div
                  key="help"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-1"
                >
                  <SettingRow icon={MessageCircle} label="Ask a Question" detail="Chat with support" />
                  <SettingRow icon={Info} label="FAQ" detail="Common issues" />
                  <SettingRow icon={Zap} label="Features" detail="What's new in Radar" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={handleLogout}
            className="w-full mt-6 flex items-center justify-center gap-2 bg-red-500/5 text-red-500 border border-red-500/10 py-3 rounded-2xl hover:bg-red-500 hover:text-white transition-all text-sm font-bold"
          >
            <LogOut size={16} />
            Logout Session
          </button>
        </div>
      </Tilt>
    </div>
  );
};

export default Profile;