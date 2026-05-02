import React from 'react';

import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

import DashboardStats from './DashboardStats';
import BookManagement from './BookManagement';
import LoanMonitoring from './LoanMonitoring';
import FineManagement from './FineManagement';

import AddFineForm from './AddFineForm';

const DasboardAdmin = () => {

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-7xl mx-auto p-6">

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-gray-800">
            Dashboard Admin
          </h1>

          <p className="text-gray-500 mt-2">
            Kelola buku, peminjaman, dan denda perpustakaan
          </p>

        </div>

        <DashboardStats />

        <section className="mb-10">
          <BookManagement />
        </section>

        <section className="mb-10">
          <LoanMonitoring />
        </section>

        <section className="mb-10">
          <FineManagement />
        </section>
        <section>
          <AddFineForm />
        </section>

      </div>

      <Footer />

    </div>

  );

};

export default DasboardAdmin;