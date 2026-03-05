import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaComments, FaUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-blackbg text-white shadow-lg">
      <h1 className="text-2xl font-bold text-darkviolet">NearChat</h1>
      <ul className="flex space-x-6">
        <li><Link to="/" className="hover:text-darkgreen"><FaHome /> Home</Link></li>
        <li><Link to="/chat" className="hover:text-darkgreen"><FaComments /> Chat</Link></li>
        <li><Link to="/profile" className="hover:text-darkgreen"><FaUser /> Profile</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;