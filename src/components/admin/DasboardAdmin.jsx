import React from 'react';
import BookManagement from './BookManagement';
import LoanMonitoring from './LoanMonitoring';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

const DasboardAdmin = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard Admin</h1>
          <p className="text-gray-600">Selamat datang kembali, Admin. Kelola koleksi buku dan pantau peminjaman di sini.</p>
        </header>

        <div className="grid grid-cols-1 gap-10">
          <section>
            <BookManagement />
          </section>
          <section>
            <LoanMonitoring />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DasboardAdmin;