import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaGithub, FaGoogle } from "react-icons/fa";

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API Call
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

  // Animation Variants
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-zinc-900/50 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl w-full max-w-md"
      >
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400">
            Welcome Back
          </h2>
          <p className="text-gray-400 mt-2">Enter your credentials to access your account</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username Input */}
          <motion.div variants={itemVariants} className="relative group">
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-emerald-400 transition-colors" />
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full bg-black/40 text-white pl-10 pr-4 py-3 rounded-xl border border-white/10 outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
              required
            />
          </motion.div>

          {/* Password Input */}
          <motion.div variants={itemVariants} className="relative group">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-emerald-400 transition-colors" />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-black/40 text-white pl-10 pr-12 py-3 rounded-xl border border-white/10 outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </motion.div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-red-400 text-sm font-medium"
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
            className={`w-full py-3 rounded-xl font-bold text-white shadow-lg transition-all 
              ${isLoading ? 'bg-gray-700 cursor-not-allowed' : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:shadow-emerald-500/20'}`}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-white/10"></div>
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        {/* Social Logins */}
        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white py-2 rounded-xl border border-white/10 transition-colors">
            <FaGoogle /> Google
          </button>
          <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white py-2 rounded-xl border border-white/10 transition-colors">
            <FaGithub /> GitHub
          </button>
        </div>

        <p className="text-sm text-gray-400 text-center mt-8">
          Don't have an account? 
          <span className="text-emerald-400 cursor-pointer hover:underline ml-1">Sign Up</span>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;