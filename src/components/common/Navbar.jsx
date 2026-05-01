import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaBookReader, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="bg-white shadow-md p-4 mb-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-indigo-600">
          <FaBookReader /> MyLibrary
        </Link>
        <div className="flex items-center gap-6">
          <span className="text-gray-600 hidden md:inline">Halo, <b>{user.name}</b> ({user.role})</span>
          <button onClick={handleLogout} className="text-red-500 hover:text-red-700 flex items-center gap-1">
            <FaSignOutAlt /> Keluar
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;