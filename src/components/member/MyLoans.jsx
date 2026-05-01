import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const MyLoans = () => {

  const [loans, setLoans] = useState([]);

  const fetchLoans = async () => {

    try {

      const res = await api.get('/loans');

      setLoans(res.data.data.loans || []);

    } catch (err) {

      console.error(err);

    }

  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const handleReturn = async (loanId) => {

    try {

      await api.put(`/loans/${loanId}/return`);

      alert('Buku berhasil dikembalikan');

      fetchLoans();

    } catch (err) {

      console.error(err);

      alert(
        err.response?.data?.message ||
        'Gagal mengembalikan buku'
      );

    }

  };

  return (

    <div className="bg-white p-6 rounded-xl shadow mt-10">

      <h2 className="text-2xl font-bold mb-6">
        Buku Yang Dipinjam
      </h2>

      <div className="space-y-4">

        {loans.map((loan) => (

          <div
            key={loan._id}
            className="border rounded-xl p-4 flex justify-between items-center"
          >

            <div>

              <h3 className="font-bold text-lg">
                {loan.book?.title}
              </h3>

              <p className="text-gray-500">
                {loan.book?.author}
              </p>

              <p className="text-sm mt-2">
                Status:
                <span className="font-bold ml-2">
                  {loan.status}
                </span>
              </p>

            </div>

            {loan.status === 'borrowed' && (

              <button
                onClick={() =>
                  handleReturn(loan._id)
                }
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Kembalikan
              </button>

            )}

          </div>

        ))}

      </div>

    </div>

  );

};

export default MyLoans;