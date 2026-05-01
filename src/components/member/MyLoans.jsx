import React, { useState, useEffect } from 'react';
import api from 'services/api';
import { calculateFine } from 'utils/fineCalculator';

const MyLoans = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchMyLoans = async () => {
      const res = await api.get('/loans?myLoans=true');
      setLoans(res.data.data.loans);
    };
    fetchMyLoans();
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Buku yang Saya Pinjam</h2>
      <div className="grid gap-4">
        {loans.length === 0 && <p className="text-gray-500 italic">Belum ada buku yang dipinjam.</p>}
        {loans.map(loan => (
          <div key={loan._id} className="bg-white p-4 rounded-lg shadow border-l-4 border-orange-500 flex justify-between">
            <div>
              <h4 className="font-bold">{loan.book?.title}</h4>
              <p className="text-sm">Jatuh Tempo: {new Date(loan.returnDate).toLocaleDateString()}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Denda Terakumulasi:</p>
              <p className="font-bold text-red-500">Rp {calculateFine(loan.returnDate).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyLoans;