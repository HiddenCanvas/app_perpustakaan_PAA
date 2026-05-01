import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const LoanMonitoring = () => {

  const [loans, setLoans] = useState([]);

  useEffect(() => {

    const fetchLoans = async () => {

      try {

        const res = await api.get('/loans');

        setLoans(res.data.data.loans || []);

      } catch (err) {
        console.error(err);
      }

    };

    fetchLoans();

  }, []);

  return (

    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        Monitoring Peminjaman
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3">Kode</th>
              <th className="text-left py-3">Member</th>
              <th className="text-left py-3">Buku</th>
              <th className="text-left py-3">Status</th>
              <th className="text-left py-3">Deadline</th>
              <th className="text-left py-3">Denda</th>

            </tr>

          </thead>

          <tbody>

            {loans.map((loan) => (

              <tr
                key={loan._id}
                className="border-b hover:bg-gray-50"
              >

                <td className="py-4">
                  {loan.loanCode}
                </td>

                <td>
                  {loan.member?.name}
                </td>

                <td>
                  {loan.book?.title}
                </td>

                <td>

                  <span className={`px-3 py-1 rounded-full text-sm ${
                    loan.status === 'returned'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>

                    {loan.status}

                  </span>

                </td>

                <td>
                  {new Date(
                    loan.dueDate
                  ).toLocaleDateString()}
                </td>

                <td className="text-red-500 font-bold">
                  Rp {loan.fineAmount.toLocaleString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default LoanMonitoring;