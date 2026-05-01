import React from 'react';
import { FaMoneyBillWave } from 'react-icons/fa';

const FinePayment = ({ totalFine }) => {
  return (
    <div className="bg-red-50 border border-red-200 p-6 rounded-xl mt-6">
      <div className="flex items-center gap-4">
        <div className="bg-red-100 p-3 rounded-full text-red-600 text-2xl">
          <FaMoneyBillWave />
        </div>
        <div>
          <h3 className="text-lg font-bold text-red-800">Total Denda Keterlambatan</h3>
          <p className="text-2xl font-black text-red-600">Rp {totalFine?.toLocaleString() || 0}</p>
        </div>
      </div>
      <button 
        className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg font-bold hover:bg-red-700 transition"
        onClick={() => alert('Silakan hubungi petugas perpustakaan untuk melakukan pembayaran.')}
      >
        Bayar di Kasir
      </button>
    </div>
  );
};

export default FinePayment;