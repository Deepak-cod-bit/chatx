import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LogOut, Settings, User, Camera, Bell, MessageSquare, 
  Lock, Globe, HelpCircle, MessageCircle, ChevronRight, 
  Info, Zap, ChevronLeft, Save, Smartphone, Hash, 
  Palette, EyeOff, Shield, Volume2, Check, HelpCircle as FAQIcon,
  Sparkles, Languages, LockKeyhole
} from "lucide-react";

const Profile = ({ user, setUser }) => {
  const [activeTab, setActiveTab] = useState("settings");
  const [view, setView] = useState("main"); 
  const [selectedLang, setSelectedLang] = useState("English (US)");

  const handleLogout = () => setUser(null);

  // --- REUSABLE COMPONENTS ---

  const SubPageHeader = ({ title }) => (
    <div className="flex items-center gap-3 mb-6">
      <button 
        onClick={() => setView("main")}
        className="p-2 hover:bg-white/10 rounded-full transition-colors text-purple-400"
      >
        <ChevronLeft size={20} />
      </button>
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
  );

  const SettingRow = ({ icon: Icon, label, detail, onClick, toggle }) => (
    <div 
      onClick={onClick}
      className="flex items-center justify-between p-4 hover:bg-white/5 rounded-2xl cursor-pointer transition-all group"
    >
      <div className="flex items-center gap-4">
        <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 group-hover:scale-110 transition-transform">
          <Icon size={18} />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium">{label}</span>
          {detail && <span className="text-[10px] text-gray-500">{detail}</span>}
        </div>
      </div>
      {toggle !== undefined ? (
        <div className={`w-8 h-4 rounded-full transition-colors ${toggle ? 'bg-purple-600' : 'bg-gray-700'} relative`}>
            <div className={`absolute top-1 w-2 h-2 rounded-full bg-white transition-all ${toggle ? 'left-5' : 'left-1'}`} />
        </div>
      ) : (
        <ChevronRight size={14} className="text-gray-600 group-hover:text-white" />
      )}
    </div>
  );

  // --- SUB-VIEW RENDERER ---

  const renderSubView = () => {
    switch(view) {
      case "account":
        return (
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
            <SubPageHeader title="Account Details" />
            <div className="flex gap-2">
              <input type="text" placeholder="First Name" className="w-1/2 bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-purple-500" />
              <input type="text" placeholder="Last Name" className="w-1/2 bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-purple-500" />
            </div>
            <input type="text" placeholder="Phone: +1..." className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-purple-500" />
            <input type="text" placeholder="User Number: #1234" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-purple-500" />
            <textarea placeholder="Bio: Write about yourself..." rows="3" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-purple-500 resize-none" />
            <input type="text" placeholder="Personal Channel URL" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-purple-500" />
            <button className="w-full bg-purple-600 py-3 rounded-xl font-bold flex items-center justify-center gap-2 mt-2 shadow-lg shadow-purple-500/20">
              <Save size={18} /> Save Profile
            </button>
          </motion.div>
        );
      case "chat":
        return (
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-1">
            <SubPageHeader title="Chat Settings" />
            <SettingRow icon={Palette} label="Theme" detail="Amoled Dark" />
            <SettingRow icon={Zap} label="Message Bubbles" detail="Gradient" />
            <SettingRow icon={Smartphone} label="Font Size" detail="14px" />
            <SettingRow icon={Languages} label="Auto-Translate" toggle={true} />
          </motion.div>
        );
      case "privacy":
        return (
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-1">
            <SubPageHeader title="Privacy & Security" />
            <SettingRow icon={EyeOff} label="Last Seen" detail="Nobody" />
            <SettingRow icon={LockKeyhole} label="Two-Step Verification" detail="On" />
            <SettingRow icon={Shield} label="Blocked Users" detail="12 Users" />
            <SettingRow icon={Shield} label="Ghost Mode" toggle={false} />
          </motion.div>
        );
      case "notif":
        return (
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-1">
            <SubPageHeader title="Notifications" />
            <SettingRow icon={Volume2} label="Message Tone" detail="Pulse" />
            <SettingRow icon={Zap} label="Vibration" detail="Strong" />
            <SettingRow icon={Bell} label="Group Notifications" toggle={true} />
          </motion.div>
        );
      case "lang":
        return (
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-1">
            <SubPageHeader title="Language" />
            {["English (US)", "Spanish", "French", "Hindi", "Japanese"].map((l) => (
              <div key={l} onClick={() => setSelectedLang(l)} className="flex items-center justify-between p-4 bg-white/5 rounded-xl mb-2 cursor-pointer">
                <span className="text-sm">{l}</span>
                {selectedLang === l && <Check size={16} className="text-purple-500" />}
              </div>
            ))}
          </motion.div>
        );
      case "ask":
        return (
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
            <SubPageHeader title="Ask a Question" />
            <div className="bg-purple-500/10 p-4 rounded-2xl border border-purple-500/20 mb-4">
                <p className="text-xs text-purple-300">Our support team typically responds within 2 hours.</p>
            </div>
            <textarea placeholder="Describe your issue..." rows="5" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-purple-500 resize-none" />
            <button className="w-full bg-purple-600 py-3 rounded-xl font-bold">Send Message</button>
          </motion.div>
        );
      case "faq":
        return (
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-2">
            <SubPageHeader title="FAQ" />
            <div className="space-y-2">
                {[
                    {q: "How to backup?", a: "Go to Settings > Data."},
                    {q: "Is Radar free?", a: "Yes, basic features are free."},
                    {q: "How to delete account?", a: "Visit Account > Security."}
                ].map((item, i) => (
                    <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5">
                        <p className="text-sm font-bold text-purple-400 mb-1">{item.q}</p>
                        <p className="text-xs text-gray-400">{item.a}</p>
                    </div>
                ))}
            </div>
          </motion.div>
        );
      case "features":
        return (
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
            <SubPageHeader title="What's New" />
            <div className="space-y-4">
                <div className="flex gap-4 p-2">
                    <div className="bg-purple-500/20 p-2 rounded-lg h-fit"><Sparkles size={20} className="text-purple-400"/></div>
                    <div>
                        <p className="text-sm font-bold">AI Chat Filtering</p>
                        <p className="text-xs text-gray-500 mt-1">Automatically blocks spam and harmful links.</p>
                    </div>
                </div>
                <div className="flex gap-4 p-2">
                    <div className="bg-blue-500/20 p-2 rounded-lg h-fit"><Zap size={20} className="text-blue-400"/></div>
                    <div>
                        <p className="text-sm font-bold">Turbo Uploads</p>
                        <p className="text-xs text-gray-500 mt-1">Share files up to 2GB at 5x speeds.</p>
                    </div>
                </div>
            </div>
          </motion.div>
        );
      default: return null;
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6 font-sans bg-[#050505]">
      <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} perspective={1000} scale={1.01}>
        <div className="bg-[#0f0f0f] border border-white/10 p-8 rounded-[2.5rem] shadow-2xl text-white w-[420px] backdrop-blur-3xl relative overflow-hidden">
          
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-600/20 blur-[90px]" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-600/10 blur-[90px]" />

          {view === "main" ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="text-center mb-6">
                <div className="relative mx-auto w-24 h-24 mb-4">
                  <div className="w-full h-full bg-gradient-to-tr from-purple-600 to-blue-500 rounded-full p-[2px]">
                    <div className="w-full h-full bg-[#0f0f0f] rounded-full flex items-center justify-center text-3xl font-bold">
                        {user?.charAt(0).toUpperCase() || "U"}
                    </div>
                  </div>
                  <button className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full border-4 border-[#0f0f0f] shadow-xl hover:scale-110 transition-transform">
                    <Camera size={14} />
                  </button>
                </div>
                <h2 className="text-2xl font-bold">{user || "User Name"}</h2>
                <p className="text-purple-400 text-[10px] font-mono mt-1 uppercase tracking-[0.3em]">Radar Pro</p>
                
                <div className="flex justify-center gap-8 border-b border-white/5 mt-6">
                  {["info", "settings", "help"].map((tab) => (
                    <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-3 text-sm capitalize relative transition-colors ${activeTab === tab ? "text-purple-500" : "text-gray-500"}`}>
                      {tab}
                      {activeTab === tab && <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-[360px] overflow-y-auto pr-2 custom-scrollbar">
                {activeTab === "info" && (
                  <div className="space-y-4 pt-2">
                    <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">My Bio</p>
                      <p className="text-sm text-gray-200 leading-relaxed italic">"Always on the radar. Tech enthusiast and developer."</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
                        <p className="text-[10px] text-gray-500 uppercase">Chats</p>
                        <p className="text-xl font-bold text-purple-400">1,284</p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
                        <p className="text-[10px] text-gray-500 uppercase">Level</p>
                        <p className="text-xl font-bold text-blue-400">12</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "settings" && (
                  <div className="space-y-1">
                    <SettingRow icon={User} label="Account" detail="Edit Profile" onClick={() => setView("account")} />
                    <SettingRow icon={MessageSquare} label="Chat Settings" detail="Themes" onClick={() => setView("chat")} />
                    <SettingRow icon={Lock} label="Privacy & Security" detail="2FA & Blocks" onClick={() => setView("privacy")} />
                    <SettingRow icon={Bell} label="Notifications" detail="Sound" onClick={() => setView("notif")} />
                    <SettingRow icon={Globe} label="Language" detail={selectedLang} onClick={() => setView("lang")} />
                  </div>
                )}

                {activeTab === "help" && (
                  <div className="space-y-1">
                    <SettingRow icon={MessageCircle} label="Ask a Question" detail="Live Support" onClick={() => setView("ask")} />
                    <SettingRow icon={FAQIcon} label="FAQ" detail="Instant Help" onClick={() => setView("faq")} />
                    <SettingRow icon={Zap} label="Features" detail="What's New" onClick={() => setView("features")} />
                  </div>
                )}
              </div>
              
              <button onClick={handleLogout} className="w-full mt-6 flex items-center justify-center gap-2 bg-red-500/10 text-red-500 py-4 rounded-2xl border border-red-500/10 hover:bg-red-500 hover:text-white transition-all text-sm font-bold">
                <LogOut size={18} /> Logout Session
              </button>
            </motion.div>
          ) : (
            renderSubView()
          )}
        </div>
      </Tilt>
    </div>
  );
};

export default Profile;