import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaGithub, FaGoogle } from "react-icons/fa";
import { ThemeContext } from "../components/ThemeContext"; // Adjust path if needed

const Login = ({ onLogin }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(""); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      if (formData.username.length < 3) {
        setError("Username must be at least 3 characters.");
        setIsLoading(false);
      } else {
        onLogin(formData.username);
        setIsLoading(false);
      }
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className={`flex items-center justify-center min-h-screen p-4 transition-colors duration-500 ${
      isDarkMode 
        ? "bg-gradient-to-br from-black via-zinc-900 to-black" 
        : "bg-gradient-to-br from-gray-100 via-white to-gray-200"
    }`}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`backdrop-blur-xl p-8 rounded-[2.5rem] border shadow-2xl w-full max-w-md transition-all duration-500 ${
          isDarkMode 
            ? "bg-zinc-900/50 border-white/10 text-white" 
            : "bg-white/80 border-gray-200 text-gray-900"
        }`}
      >
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h2 className={`text-4xl font-black tracking-tight ${
            isDarkMode 
              ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400" 
              : "text-gray-900"
          }`}>
            Welcome Back
          </h2>
          <p className={`${isDarkMode ? "text-gray-400" : "text-gray-500"} mt-2`}>
            Enter your credentials to access your account
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username Input */}
          <motion.div variants={itemVariants} className="relative group">
            <FaUser className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
              isDarkMode ? "text-gray-500 group-focus-within:text-emerald-400" : "text-gray-400 group-focus-within:text-purple-600"
            }`} />
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border outline-none transition-all ${
                isDarkMode 
                  ? "bg-black/40 text-white border-white/10 focus:border-emerald-500/50" 
                  : "bg-gray-100 text-gray-900 border-gray-200 focus:border-purple-500/50"
              }`}
              required
            />
          </motion.div>

          {/* Password Input */}
          <motion.div variants={itemVariants} className="relative group">
            <FaLock className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
              isDarkMode ? "text-gray-500 group-focus-within:text-emerald-400" : "text-gray-400 group-focus-within:text-purple-600"
            }`} />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full pl-12 pr-12 py-3.5 rounded-2xl border outline-none transition-all ${
                isDarkMode 
                  ? "bg-black/40 text-white border-white/10 focus:border-emerald-500/50" 
                  : "bg-gray-100 text-gray-900 border-gray-200 focus:border-purple-500/50"
              }`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-500 transition-colors"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </motion.div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-red-500 text-sm font-bold text-center"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-white shadow-xl transition-all 
              ${isLoading 
                ? 'bg-gray-500 cursor-not-allowed' 
                : (isDarkMode ? 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-emerald-900/20' : 'bg-purple-600 shadow-purple-200')
              }`}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-8">
          <div className={`flex-1 h-px ${isDarkMode ? "bg-white/10" : "bg-gray-200"}`}></div>
          <span className="px-4 text-gray-400 text-xs font-bold tracking-widest">OR</span>
          <div className={`flex-1 h-px ${isDarkMode ? "bg-white/10" : "bg-gray-200"}`}></div>
        </div>

        {/* Social Logins */}
        <div className="grid grid-cols-2 gap-4">
          <button className={`flex items-center justify-center gap-2 py-3 rounded-2xl border transition-all font-medium text-sm ${
            isDarkMode ? "bg-white/5 border-white/10 hover:bg-white/10 text-white" : "bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700"
          }`}>
            <FaGoogle /> Google
          </button>
          <button className={`flex items-center justify-center gap-2 py-3 rounded-2xl border transition-all font-medium text-sm ${
            isDarkMode ? "bg-white/5 border-white/10 hover:bg-white/10 text-white" : "bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700"
          }`}>
            <FaGithub /> GitHub
          </button>
        </div>

        <p className="text-sm text-center mt-10 font-medium">
          <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>Don't have an account?</span>
          <span className="text-purple-500 cursor-pointer hover:underline ml-1 font-bold">Sign Up</span>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;