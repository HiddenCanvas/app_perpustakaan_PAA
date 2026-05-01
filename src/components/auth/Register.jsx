import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'member',
  });  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      alert('Registrasi Berhasil! Silakan Login.');
      navigate('/login');
    } catch (err) { alert('Gagal Register'); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Daftar Member</h2>
        <input type="text" placeholder="Nama Lengkap" className="w-full p-3 border rounded mb-4" 
          onChange={(e) => setFormData({...formData, name: e.target.value})} required />
        <input type="email" placeholder="Email" className="w-full p-3 border rounded mb-4" 
          onChange={(e) => setFormData({...formData, email: e.target.value})} required />
        <input type="password" placeholder="Password" className="w-full p-3 border rounded mb-6" 
          onChange={(e) => setFormData({...formData, password: e.target.value})} required />
        <button className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700">Daftar Sekarang</button>
        <p className="mt-4 text-center">Sudah punya akun? <Link to="/login" className="text-blue-600">Login</Link></p>
      </form>
    </div>
  );
};

export default Register;