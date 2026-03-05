import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaLock } from "react-icons/fa";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just call the onLogin callback
    onLogin(username);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blackbg">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-darkviolet p-8 rounded-2xl shadow-lg w-80"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex items-center gap-2 bg-blackbg rounded-lg p-2 border border-darkgreen">
            <FaUser className="text-darkgreen" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-blackbg text-white outline-none flex-1"
              required
            />
          </div>

          <div className="flex items-center gap-2 bg-blackbg rounded-lg p-2 border border-darkgreen">
            <FaLock className="text-darkgreen" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-blackbg text-white outline-none flex-1"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-darkgreen hover:bg-darkviolet text-white font-bold py-2 rounded-lg transition-colors"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-gray-300 text-center mt-4">
          Don't have an account? <span className="text-darkgreen cursor-pointer">Sign Up</span>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;