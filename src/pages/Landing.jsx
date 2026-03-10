import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../components/ThemeContext";

const Landing = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={`relative flex flex-col items-center justify-center min-h-screen px-6 overflow-hidden transition-colors duration-500 ${isDarkMode ? "bg-black text-white" : "bg-gray-50 text-gray-900"}`}>
      
      {/* Background Radar Animation */}
      <div className="absolute inset-0 z-0">
         <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border rounded-full animate-ping opacity-20 ${isDarkMode ? "border-purple-500" : "border-purple-300"}`} />
         <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border rounded-full animate-pulse opacity-20 ${isDarkMode ? "border-emerald-500" : "border-emerald-300"}`} />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 text-center"
      >
        <span className={`px-4 py-1 rounded-full border text-sm font-medium mb-6 inline-block ${isDarkMode ? "border-purple-500/50 text-purple-400 bg-purple-500/10" : "border-purple-200 text-purple-600 bg-white shadow-sm"}`}>
          Now Live: Hyper-Local Networking
        </span>
        
        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight leading-none">
          NEON <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-emerald-500">
            RADAR
          </span>
        </h1>
        
        <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          The decentralized way to meet people around you. 
          Real-time location, instant connection, zero friction.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")}
            className="px-10 py-4 bg-gradient-to-r from-purple-600 to-emerald-600 text-white font-bold rounded-2xl shadow-xl transition-all"
          >
            Get Started Free
          </motion.button>
          
          <button className={`font-semibold transition-colors ${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-purple-600"}`}>
            View Source Code →
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Landing;