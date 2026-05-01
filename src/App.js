import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages - Perhatikan penggunaan "./" di awal jalur
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import BookManagement from './components/admin/BookManagement';
import BookCatalog from './components/member/BookCatalog';
import DasboardAdmin from './components/admin/DasboardAdmin'; // Sesuai typo di folder Anda

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Route Admin */}
          <Route path="/admin" element={
            <ProtectedRoute roleRequired="admin">
              <DasboardAdmin />
            </ProtectedRoute>
          } />
          <Route path="/admin/books" element={
            <ProtectedRoute roleRequired="admin">
              <BookManagement />
            </ProtectedRoute>
          } />

          {/* Route Member */}
          <Route path="/member" element={
            <ProtectedRoute roleRequired="member">
              <BookCatalog />
            </ProtectedRoute>
          } />

          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<div className="p-10 text-center text-2xl">404 - Halaman Tidak Ditemukan</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;