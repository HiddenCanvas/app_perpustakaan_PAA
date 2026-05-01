import React, { useEffect, useMemo, useState } from 'react';
import api from '../../services/api';

const FineManagement = () => {

  const [fines, setFines] = useState([]);
  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  const fetchFines = async () => {
    try {

      const res = await api.get('/fines');

      setFines(res.data.data.fines || []);

    } catch (err) {

      console.error(err);
      alert('Gagal mengambil data denda');

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchFines();
  }, []);

  const handlePayFine = async (id) => {

    try {

      await api.put(`/fines/${id}/pay`, {
        paymentMethod: 'cash',
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

  const filteredFines = useMemo(() => {

    return fines.filter((fine) => {

      const memberName =
        fine.member?.name?.toLowerCase() || '';

      const fineCode =
        fine.fineCode?.toLowerCase() || '';

      const keyword = search.toLowerCase();

      const matchSearch =
        memberName.includes(keyword) ||
        fineCode.includes(keyword);

      const matchStatus =
        statusFilter === 'all'
          ? true
          : fine.status === statusFilter;

      return matchSearch && matchStatus;

    });

  }, [fines, search, statusFilter]);

  const unpaidTotal = fines
    .filter((fine) => fine.status === 'unpaid')
    .reduce((acc, fine) => acc + fine.amount, 0);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-10">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Manajemen Denda
          </h2>

          <p className="text-gray-500 mt-1">
            Monitoring seluruh denda anggota perpustakaan
          </p>
        </div>

        <div className="bg-red-100 text-red-700 px-5 py-3 rounded-xl">
          <p className="text-sm font-semibold">
            Total Denda Belum Dibayar
          </p>

          <h3 className="text-2xl font-black">
            Rp {unpaidTotal.toLocaleString()}
          </h3>
        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">

        <input
          type="text"
          placeholder="Cari nama member / kode denda"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-3 rounded-xl"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-3 rounded-xl"
        >
          <option value="all">
            Semua Status
          </option>

          <option value="paid">
            Sudah Dibayar
          </option>

          <option value="unpaid">
            Belum Dibayar
          </option>

        </select>

      </div>

      {loading ? (

        <p>Loading...</p>

      ) : filteredFines.length === 0 ? (

        <div className="text-center py-10 text-gray-500">
          Tidak ada data denda
        </div>

      ) : (

        <div className="space-y-5">

          {filteredFines.map((fine) => (

            <div
              key={fine._id}
              className="border rounded-2xl p-5 shadow-sm"
            >

              <div className="flex flex-col md:flex-row md:justify-between gap-5">

                <div>

                  <h3 className="text-xl font-bold">
                    {fine.member?.name}
                  </h3>

                  <p className="text-gray-500">
                    {fine.member?.email}
                  </p>

                  <div className="mt-3 space-y-1 text-sm">

                    <p>
                      <b>Kode Denda:</b> {fine.fineCode}
                    </p>

                    <p>
                      <b>Alasan:</b> {fine.reason}
                    </p>

                    <p>
                      <b>Jumlah:</b> Rp {fine.amount.toLocaleString()}
                    </p>

                    <p>
                      <b>Status:</b>

                      <span
                        className={`ml-2 px-3 py-1 rounded-full text-xs font-bold ${
                          fine.status === 'paid'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {fine.status}
                      </span>
                    </p>

                  </div>

                </div>

                <div className="flex flex-col justify-between">

                  <div className="text-sm text-gray-500">
                    Dibuat:
                    <br />

                    {new Date(
                      fine.createdAt
                    ).toLocaleString()}
                  </div>

                  {fine.status === 'unpaid' && (

                    <button
                      onClick={() =>
                        handlePayFine(fine._id)
                      }
                      className="mt-4 bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700 font-semibold"
                    >
                      Tandai Sudah Dibayar
                    </button>

                  )}

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default FineManagement;