import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const MyFines = () => {

  const [fines, setFines] = useState([]);

  const fetchFines = async () => {

    try {

      const res = await api.get('/fines');

      setFines(res.data.data.fines || []);

    } catch (err) {

      console.error(err);

    }

  };

  useEffect(() => {
    fetchFines();
  }, []);

  const handlePay = async (fineId) => {

    try {

      await api.put(`/fines/${fineId}/pay`, {
        paymentMethod: 'cash',
      });

      alert('Denda berhasil dibayar');

      fetchFines();

    } catch (err) {

      console.error(err);

      alert(
        err.response?.data?.message ||
        'Gagal bayar denda'
      );

    }

  };

  return (

    <div className="bg-white p-6 rounded-xl shadow mt-10">

      <h2 className="text-2xl font-bold mb-6">
        Denda Saya
      </h2>

      <div className="space-y-4">

        {fines.map((fine) => (

          <div
            key={fine._id}
            className="border rounded-xl p-4 flex justify-between items-center"
          >

            <div>

              <h3 className="font-bold">
                {fine.reason}
              </h3>

              <p>
                Rp {fine.amount.toLocaleString()}
              </p>

              <p className="text-sm">
                Status:
                <span className="ml-2 font-bold">
                  {fine.status}
                </span>
              </p>

            </div>

            {fine.status === 'unpaid' && (

              <button
                onClick={() =>
                  handlePay(fine._id)
                }
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Bayar
              </button>

            )}

          </div>

        ))}

      </div>

    </div>

  );

};

export default MyFines;