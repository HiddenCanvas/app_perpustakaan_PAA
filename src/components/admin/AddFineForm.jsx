import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const AddFineForm = () => {

  const [loans, setLoans] = useState([]);

  const [form, setForm] = useState({
    loanId: '',
    amount: '',
    reason: '',
    notes: '',
  });

  const [loading, setLoading] =
    useState(false);

  const [search, setSearch] =
    useState('');

  const fetchLoans = async (
    keyword = ''
  ) => {

    try {

      const endpoint = keyword
        ? `/loans?search=${keyword}&limit=9999`
        : '/loans?limit=9999';

      const res = await api.get(
        endpoint
      );

      setLoans(
        res.data.data.loans || []
      );

    } catch (err) {

      console.error(err);

      alert(
        'Gagal mengambil data peminjaman'
      );

    }

  };

  useEffect(() => {

    fetchLoans();

  }, []);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await api.post('/fines', {
        loanId: form.loanId,
        amount: Number(form.amount),
        reason: form.reason,
        notes: form.notes,
      });

      alert(
        'Denda berhasil dibuat'
      );

      setForm({
        loanId: '',
        amount: '',
        reason: '',
        notes: '',
      });

    } catch (err) {

      console.error(err);

      alert(
        err.response?.data?.message ||
        'Gagal membuat denda'
      );

    } finally {

      setLoading(false);

    }

  };

  const filteredLoans =
    loans.filter((loan) => {

      const keyword =
        search.toLowerCase();

      return (
        loan.member?.name
          ?.toLowerCase()
          .includes(keyword)

        ||

        loan.book?.title
          ?.toLowerCase()
          .includes(keyword)

        ||

        loan.loanCode
          ?.toLowerCase()
          .includes(keyword)
      );

    });

  return (

    <div className="bg-white p-6 rounded-2xl shadow-lg mt-10">

      <div className="mb-6">

        <h2 className="text-3xl font-bold">
          Tambah Denda
        </h2>

        <p className="text-gray-500 mt-1">
          Berikan denda manual kepada member
        </p>

      </div>

      <input
        type="text"
        placeholder="Cari member / buku / loan code"
        value={search}
        onChange={(e) => {

          const value =
            e.target.value;

          setSearch(value);

          fetchLoans(value);

        }}
        className="border p-3 rounded-xl w-full mb-4"
      />

      <form
        onSubmit={handleSubmit}
        className="grid gap-4"
      >

        <select
          name="loanId"
          value={form.loanId}
          onChange={handleChange}
          className="border p-3 rounded-xl"
          required
        >

          <option value="">
            Pilih Peminjaman
          </option>

          {filteredLoans.map((loan) => (

            <option
              key={loan._id}
              value={loan._id}
            >

              {loan.loanCode}
              {' - '}
              {loan.member?.name}
              {' - '}
              {loan.book?.title}

            </option>

          ))}

        </select>

        <input
          type="number"
          name="amount"
          placeholder="Jumlah Denda"
          value={form.amount}
          onChange={handleChange}
          className="border p-3 rounded-xl"
          required
        />

        <select
          name="reason"
          value={form.reason}
          onChange={handleChange}
          className="border p-3 rounded-xl"
          required
        >

          <option value="">
            Pilih Alasan Denda
          </option>

          <option value="kerusakan">
            Kerusakan
          </option>

          <option value="keterlambatan">
            Keterlambatan
          </option>

          <option value="kehilangan">
            Kehilangan
          </option>

        </select>

        <textarea
          name="notes"
          placeholder="Catatan Tambahan"
          value={form.notes}
          onChange={handleChange}
          className="border p-3 rounded-xl h-28"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold disabled:bg-gray-400"
        >

          {loading
            ? 'Menyimpan...'
            : 'Tambah Denda'}

        </button>

      </form>

    </div>

  );

};

export default AddFineForm;