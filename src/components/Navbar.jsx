import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaComments, FaUser, FaSun, FaMoon } from "react-icons/fa";
import { ThemeContext } from "./ThemeContext";

const Navbar = ({ onLogout }) => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className={`flex justify-between items-center p-4 shadow-lg transition-colors duration-300 ${isDarkMode ? "bg-[#0f0f0f] text-white" : "bg-white text-gray-800"}`}>
      <h1 className="text-2xl font-bold text-purple-500">NearChat</h1>
      <ul className="flex items-center space-x-6">
        <li>
          <Link to="/radar" className="hover:text-purple-400 transition-colors flex items-center gap-2">
            <FaHome /> Home
          </Link>
        </li>
        <li>
          <Link to="/chat" className="hover:text-purple-400 transition-colors flex items-center gap-2">
            <FaComments /> Chat
          </Link>
        </li>
        <li>
          <Link to="/profile" className="hover:text-purple-400 transition-colors flex items-center gap-2">
            <FaUser /> Profile
          </Link>
        </li>
        <li className="flex items-center">
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all ${isDarkMode ? "hover:bg-white/10 text-yellow-400" : "hover:bg-black/5 text-purple-600"}`}
          >
            {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
        </li>
        <li>
          <button onClick={onLogout} className="text-red-500 font-medium hover:underline">Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;