import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { calculateFine } from '../../utils/fineCalculator';

const LoanMonitoring = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      const res = await api.get('/loans');
      setLoans(res.data.data.loans);
    };
    fetchLoans();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Monitoring Peminjaman</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">Peminjam</th>
            <th>Buku</th>
            <th>Tgl Kembali</th>
            <th>Denda Est.</th>
          </tr>
        </thead>
        <tbody>
          {loans.map(loan => (
            <tr key={loan._id} className="border-b hover:bg-gray-50">
              <td className="py-3">{loan.user?.name}</td>
              <td>{loan.book?.title}</td>
              <td>{new Date(loan.returnDate).toLocaleDateString()}</td>
              <td className="text-red-600 font-bold">Rp {calculateFine(loan.returnDate).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoanMonitoring;