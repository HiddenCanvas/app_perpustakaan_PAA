import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const user = await login(email, password);
      navigate(user.role === 'admin' ? '/admin' : '/member');
    } catch (err) {
      setError(err.response?.data?.message || 'Email atau Password salah');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">Library Login</h2>
        {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">{error}</div>}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input type="email" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none" 
            onChange={(e) => setEmail(e.target.value)} required placeholder="admin@example.com" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <input type="password" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none" 
            onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
        </div>
        <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">Login</button>
        <p className="mt-4 text-center text-gray-600">Belum punya akun? <Link to="/register" className="text-indigo-600 hover:underline">Daftar</Link></p>
      </form>
    </div>
  );
};

export default Login;