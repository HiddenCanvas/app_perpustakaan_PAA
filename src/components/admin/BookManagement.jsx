import React, { useEffect, useMemo, useState } from 'react';
import api from '../../services/api';

import {
  FaTrash,
  FaEdit,
  FaSearch,
  FaBook,
} from 'react-icons/fa';

const initialForm = {
  title: '',
  author: '',
  isbn: '',
  publisher: '',
  publishYear: '',
  category: '',
  description: '',
  pages: '',
  totalCopies: 1,
  location: '',
  coverImage: '',
};

const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);


  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] =
    useState('all');

  const [form, setForm] =
    useState(initialForm);

  const [editingId, setEditingId] =
    useState(null);

  const fetchBooks = async () => {
    try {
      setLoading(true);

      const res = await api.get('/books');

      setBooks(res.data.data.books || []);
    } catch (err) {
      console.error(err);
      alert('Gagal mengambil data buku');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      publishYear: Number(form.publishYear),
      pages: Number(form.pages),
      totalCopies: Number(form.totalCopies),
    };

    try {
      if (editingId) {
        await api.put(
          `/books/${editingId}`,
          payload
        );

        alert('Buku berhasil diupdate');
      } else {
        await api.post(
          '/books',
          payload
        );

        alert('Buku berhasil ditambahkan');
      }

      resetForm();
      fetchBooks();
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          'Terjadi kesalahan'
      );
    }
  };

  const handleEdit = (book) => {
    setEditingId(book._id);

    setForm({
      title: book.title || '',
      author: book.author || '',
      isbn: book.isbn || '',
      publisher: book.publisher || '',
      publishYear:
        book.publishYear || '',
      category:
        book.category || '',
      description:
        book.description || '',
      pages: book.pages || '',
      totalCopies:
        book.totalCopies || 1,
      location:
        book.location || '',
      coverImage:
        book.coverImage || '',
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        'Yakin ingin menghapus buku ini?'
      );

    if (!confirmDelete) return;

    try {
      await api.delete(`/books/${id}`);

      alert('Buku berhasil dihapus');

      fetchBooks();
    } catch (err) {
      console.error(err);

      alert('Gagal menghapus buku');
    }
  };

  const categories = [
    ...new Set(
      books.map(
        (book) => book.category
      )
    ),
  ];

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchCategory =
        categoryFilter === 'all'
          ? true
          : book.category ===
            categoryFilter;

      const matchSearch =
        book.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        book.author
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        book.category
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      return (
        matchCategory &&
        matchSearch
      );
    });
  }, [
    books,
    categoryFilter,
    search,
  ]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            {editingId
              ? 'Edit Buku'
              : 'Manajemen Buku'}
          </h2>

          <p className="text-gray-500 mt-1">
            Kelola koleksi buku perpustakaan
          </p>
        </div>

        {editingId && (
          <button
            onClick={resetForm}
            className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-3 rounded-lg font-semibold"
          >
            Cancel Edit
          </button>
        )}
      </div>

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10"
      >

        <input
          type="text"
          name="title"
          placeholder="Judul Buku"
          value={form.title}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="text"
          name="author"
          placeholder="Penulis"
          value={form.author}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="text"
          name="isbn"
          placeholder="ISBN"
          value={form.isbn}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="text"
          name="publisher"
          placeholder="Publisher"
          value={form.publisher}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="number"
          name="publishYear"
          placeholder="Tahun Terbit"
          value={form.publishYear}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Kategori"
          value={form.category}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="number"
          name="pages"
          placeholder="Jumlah Halaman"
          value={form.pages}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="number"
          name="totalCopies"
          placeholder="Total Buku"
          value={form.totalCopies}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Lokasi Rak"
          value={form.location}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="text"
          name="coverImage"
          placeholder="URL Cover Buku"
          value={form.coverImage}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <textarea
          name="description"
          placeholder="Deskripsi Buku"
          value={form.description}
          onChange={handleChange}
          className="border p-3 rounded-lg md:col-span-2 h-32"
        />

        <button
          type="submit"
          className={`text-white py-3 rounded-lg font-bold transition md:col-span-2 ${
            editingId
              ? 'bg-yellow-600 hover:bg-yellow-700'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {editingId
            ? 'Update Buku'
            : 'Tambah Buku'}
        </button>

      </form>

      {/* FILTER */}

      <div className="flex flex-col md:flex-row gap-4 mb-8">

        <div className="flex items-center border rounded-lg px-3 flex-1">

          <FaSearch className="text-gray-400" />

          <input
            type="text"
            placeholder="Cari judul, penulis, kategori..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full p-3 outline-none"
          />

        </div>

        <select
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(
              e.target.value
            )
          }
          className="border p-3 rounded-lg"
        >

          <option value="all">
            Semua Kategori
          </option>

          {categories.map((cat) => (
            <option
              key={cat}
              value={cat}
            >
              {cat}
            </option>
          ))}

        </select>

      </div>

      {/* TOTAL */}

      <div className="mb-6">
        <p className="text-gray-600">
          Total Buku:
          <span className="font-bold ml-2">
            {filteredBooks.length}
          </span>
        </p>
      </div>

      {/* LIST */}

      <div className="grid gap-5">

        {loading ? (
          <p>Loading buku...</p>
        ) : filteredBooks.length ===
          0 ? (
          <div className="text-center py-10 border rounded-xl">

            <FaBook className="mx-auto text-5xl text-gray-300 mb-4" />

            <p className="text-gray-500">
              Buku tidak ditemukan
            </p>

          </div>
        ) : (
          filteredBooks.map((book) => (
            <div
              key={book._id}
              className="border rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-5 hover:shadow-md transition"
            >

              <div className="flex gap-4">

                <img
                  src={
                    book.coverImage &&
                    book.coverImage !== '-'
                      ? book.coverImage
                      : 'https://via.placeholder.com/100x140'
                  }
                  alt={book.title}
                  className="w-24 h-32 object-cover rounded-lg border"
                />

                <div>

                  <h3 className="text-xl font-bold">
                    {book.title}
                  </h3>

                  <p className="text-gray-700">
                    {book.author}
                  </p>

                  <p className="text-sm text-indigo-600 font-semibold">
                    {book.category}
                  </p>

                  <p className="text-sm mt-2">
                    ISBN:
                    {' '}
                    {book.isbn}
                  </p>

                  <p className="text-sm">
                    Tahun:
                    {' '}
                    {book.publishYear}
                  </p>

                  <p className="text-sm">
                    Stok:
                    {' '}
                    <span className="font-bold">
                      {
                        book.availableCopies
                      }
                    </span>
                  </p>

                  <p className="text-sm">
                    Lokasi:
                    {' '}
                    {book.location}
                  </p>

                </div>

              </div>

              <div className="flex gap-3">

                <button
                  onClick={() =>
                    handleEdit(book)
                  }
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-3 rounded-lg flex items-center gap-2"
                >
                  <FaEdit />
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(
                      book._id
                    )
                  }
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg flex items-center gap-2"
                >
                  <FaTrash />
                  Hapus
                </button>

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default BookManagement;