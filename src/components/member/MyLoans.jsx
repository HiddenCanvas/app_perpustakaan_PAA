import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const MyFines = () => {

  const [fines, setFines] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFines = async () => {

    try {

      const res = await api.get('/fines');

      setFines(res.data.data.fines || []);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchFines();

  }, []);

  const handlePay = async (fineId) => {

    const confirmPay = window.confirm(
      'Bayar denda ini?'
    );

    if (!confirmPay) return;

    try {

      await api.put(`/fines/${fineId}/pay`, {
        paymentMethod: 'tunai',
      });

      alert('Denda berhasil dibayar');

      fetchFines();

    } catch (err) {

      console.error(err);

      alert(
        err.response?.data?.message ||
        'Gagal membayar denda'
      );

    }

  };

  if (loading) {

    return (
      <p className="text-center py-10">
        Loading denda...
      </p>
    );

  }

  return (

    <div className="bg-white p-6 rounded-xl shadow mt-8">

      <h2 className="text-2xl font-bold mb-6">
        Denda Saya
      </h2>

      {fines.length === 0 && (

        <p className="text-gray-500">
          Tidak ada denda
        </p>

      )}

      <div className="space-y-4">

        {fines.map((fine) => (

          <div
            key={fine._id}
            className="border rounded-xl p-4 flex justify-between items-center"
          >

            <div>

              <h3 className="font-bold text-lg">
                {fine.fineCode}
              </h3>

              <p>
                Jumlah:
                {' '}
                Rp {fine.amount.toLocaleString()}
              </p>

              <p>
                Alasan:
                {' '}
                {fine.reason}
              </p>

              <p
                className={`font-semibold ${
                  fine.status === 'paid'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >

                {fine.status === 'paid'
                  ? 'Sudah Dibayar'
                  : 'Belum Dibayar'}

              </p>

            </div>

            {fine.status === 'unpaid' && (

              <button
                onClick={() =>
                  handlePay(fine._id)
                }
                className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
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