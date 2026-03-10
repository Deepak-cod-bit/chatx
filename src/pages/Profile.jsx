import React, { useState, useContext } from "react";
import Tilt from "react-parallax-tilt";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LogOut, Settings, User, Camera, Bell, MessageSquare, 
  Lock, Globe, HelpCircle, MessageCircle, ChevronRight, 
  Save, Smartphone, Palette, EyeOff, Shield, Volume2, Check, 
  HelpCircle as FAQIcon, Sparkles, Languages, LockKeyhole, ChevronLeft, Zap
} from "lucide-react";
import { ThemeContext } from "../components/ThemeContext"; // Ensure correct path

const Profile = ({ user, setUser }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState("settings");
  const [view, setView] = useState("main"); 
  const [selectedLang, setSelectedLang] = useState("English (US)");

  const handleLogout = () => setUser(null);

  // --- REUSABLE COMPONENTS ---
  const SubPageHeader = ({ title }) => (
    <div className="flex items-center gap-3 mb-6">
      <button 
        onClick={() => setView("main")}
        className={`p-2 rounded-full transition-colors ${isDarkMode ? "hover:bg-white/10 text-purple-400" : "hover:bg-black/5 text-purple-600"}`}
      >
        <ChevronLeft size={20} />
      </button>
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
  );

  const SettingRow = ({ icon: Icon, label, detail, onClick, toggle }) => (
    <div 
      onClick={onClick}
      className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all group ${isDarkMode ? "hover:bg-white/5" : "hover:bg-black/5"}`}
    >
      <div className="flex items-center gap-4">
        <div className={`p-2 rounded-lg group-hover:scale-110 transition-transform ${isDarkMode ? "bg-purple-500/10 text-purple-400" : "bg-purple-100 text-purple-600"}`}>
          <Icon size={18} />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium">{label}</span>
          {detail && <span className="text-[10px] text-gray-500">{detail}</span>}
        </div>
      </div>
      {toggle !== undefined ? (
        <div className={`w-8 h-4 rounded-full transition-colors relative ${toggle ? 'bg-purple-600' : 'bg-gray-400'}`}>
            <div className={`absolute top-1 w-2 h-2 rounded-full bg-white transition-all ${toggle ? 'left-5' : 'left-1'}`} />
        </div>
      ) : (
        <ChevronRight size={14} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
      )}
    </div>
  );

  const renderSubView = () => {
    const inputClass = `w-full border rounded-xl p-3 text-sm outline-none focus:border-purple-500 transition-colors ${isDarkMode ? "bg-white/5 border-white/10 text-white" : "bg-gray-100 border-gray-200 text-gray-900"}`;
    
    switch(view) {
      case "account":
        return (
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
            <SubPageHeader title="Account Details" />
            <div className="flex gap-2">
              <input type="text" placeholder="First Name" className={inputClass} />
              <input type="text" placeholder="Last Name" className={inputClass} />
            </div>
            <input type="text" placeholder="Phone" className={inputClass} />
            <textarea placeholder="Bio..." rows="3" className={`${inputClass} resize-none`} />
            <button className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 hover:bg-purple-700 transition-colors">
              <Save size={18} /> Save Profile
            </button>
          </motion.div>
        );
      case "chat":
        return (
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-1">
            <SubPageHeader title="Chat Settings" />
            <SettingRow icon={Palette} label="Theme" detail={isDarkMode ? "Amoled Dark" : "Crystal Light"} />
            <SettingRow icon={Zap} label="Message Bubbles" detail="Gradient" />
            <SettingRow icon={Languages} label="Auto-Translate" toggle={true} />
          </motion.div>
        );
      case "privacy":
        return (
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-1">
            <SubPageHeader title="Privacy" />
            <SettingRow icon={EyeOff} label="Last Seen" detail="Nobody" />
            <SettingRow icon={Shield} label="Ghost Mode" toggle={false} />
          </motion.div>
        );
      case "lang":
        return (
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <SubPageHeader title="Language" />
            {["English (US)", "Spanish", "French", "Hindi"].map((l) => (
              <div key={l} onClick={() => setSelectedLang(l)} className={`flex items-center justify-between p-4 rounded-xl mb-2 cursor-pointer ${isDarkMode ? "bg-white/5" : "bg-gray-100"}`}>
                <span className="text-sm">{l}</span>
                {selectedLang === l && <Check size={16} className="text-purple-500" />}
              </div>
            ))}
          </motion.div>
        );
      default: return null;
    }
  };

  return (
    <div className={`flex justify-center items-center min-h-screen p-6 font-sans transition-colors duration-300 ${isDarkMode ? "bg-[#050505]" : "bg-gray-200"}`}>
      <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} perspective={1000} scale={1.01}>
        <div className={`p-8 rounded-[2.5rem] shadow-2xl w-[420px] backdrop-blur-3xl relative overflow-hidden transition-colors border ${isDarkMode ? "bg-[#0f0f0f] border-white/10 text-white" : "bg-white border-gray-200 text-gray-900"}`}>
          
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-600/20 blur-[90px]" />

          {view === "main" ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="text-center mb-6">
                <div className="relative mx-auto w-24 h-24 mb-4">
                  <div className="w-full h-full bg-gradient-to-tr from-purple-600 to-blue-500 rounded-full p-[2px]">
                    <div className={`w-full h-full rounded-full flex items-center justify-center text-3xl font-bold ${isDarkMode ? "bg-[#0f0f0f]" : "bg-white"}`}>
                        {user?.charAt(0).toUpperCase() || "U"}
                    </div>
                  </div>
                  <button className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full border-4 border-current text-current shadow-xl">
                    <Camera size={14} className="text-white" />
                  </button>
                </div>
                <h2 className="text-2xl font-bold">{user || "User Name"}</h2>
                <p className="text-purple-500 text-[10px] font-mono mt-1 uppercase tracking-[0.3em]">Radar Pro</p>
                
                <div className={`flex justify-center gap-8 border-b mt-6 ${isDarkMode ? "border-white/5" : "border-gray-100"}`}>
                  {["info", "settings", "help"].map((tab) => (
                    <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-3 text-sm capitalize relative transition-colors ${activeTab === tab ? "text-purple-500 font-bold" : "text-gray-400"}`}>
                      {tab}
                      {activeTab === tab && <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-[340px] overflow-y-auto pr-2 custom-scrollbar">
                {activeTab === "info" && (
                  <div className="space-y-4 pt-2">
                    <div className={`p-5 rounded-2xl border ${isDarkMode ? "bg-white/5 border-white/5" : "bg-gray-50 border-gray-100"}`}>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">My Bio</p>
                      <p className="text-sm leading-relaxed italic">"Always on the radar. Tech enthusiast."</p>
                    </div>
                  </div>
                )}

                {activeTab === "settings" && (
                  <div className="space-y-1">
                    <SettingRow icon={User} label="Account" detail="Edit Profile" onClick={() => setView("account")} />
                    <SettingRow icon={MessageSquare} label="Chat Settings" onClick={() => setView("chat")} />
                    <SettingRow icon={Lock} label="Privacy & Security" onClick={() => setView("privacy")} />
                    <SettingRow icon={Globe} label="Language" detail={selectedLang} onClick={() => setView("lang")} />
                  </div>
                )}
              </div>
              
              <button onClick={handleLogout} className="w-full mt-6 flex items-center justify-center gap-2 bg-red-500/10 text-red-500 py-4 rounded-2xl border border-red-500/10 hover:bg-red-500 hover:text-white transition-all text-sm font-bold">
                <LogOut size={18} /> Logout Session
              </button>
            </motion.div>
          ) : renderSubView()}
        </div>
      </Tilt>
    </div>
  );
};

export default Profile;