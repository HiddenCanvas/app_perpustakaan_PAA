import React, { useEffect, useState } from 'react';

import api from '../../services/api';

import {
  FaTrash,
  FaEdit,
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
    const [categoryFilter, setCategoryFilter] = useState('all');
  const [form, setForm] =
    useState(initialForm);

  const [editingId, setEditingId] =
    useState(null);

  const fetchBooks = async () => {

    try {

      const res = await api.get('/books');

      setBooks(res.data.data.books || []);

    } catch (err) {
      console.error(err);
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

      await api.delete(
        `/books/${id}`
      );

      alert('Buku berhasil dihapus');

      fetchBooks();

    } catch (err) {

      console.error(err);

      alert('Gagal hapus buku');

    }

  };
const filteredBooks =
  categoryFilter === 'all'
    ? books
    : books.filter(
        (book) =>
          book.category === categoryFilter
      );

const categories = [
  ...new Set(
    books.map(
      (book) => book.category
    )
  ),
];
  return (

    <div className="bg-white p-6 rounded-xl shadow">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-3xl font-bold">

          {editingId
            ? 'Edit Buku'
            : 'Tambah Buku'}

        </h2>

        {editingId && (

          <button
            onClick={resetForm}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel Edit
          </button>

        )}

      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10"
      >

        <input
          name="title"
          placeholder="Judul Buku"
          value={form.title}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <input
          name="author"
          placeholder="Penulis"
          value={form.author}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <input
          name="isbn"
          placeholder="ISBN"
          value={form.isbn}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <input
          name="publisher"
          placeholder="Publisher"
          value={form.publisher}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <input
          type="number"
          name="publishYear"
          placeholder="Tahun"
          value={form.publishYear}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <input
          name="category"
          placeholder="Kategori"
          value={form.category}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <input
          type="number"
          name="pages"
          placeholder="Halaman"
          value={form.pages}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <input
          type="number"
          name="totalCopies"
          placeholder="Total Buku"
          value={form.totalCopies}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <input
          name="location"
          placeholder="Lokasi Rak"
          value={form.location}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <input
          name="coverImage"
          placeholder="URL Cover"
          value={form.coverImage}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <textarea
          name="description"
          placeholder="Deskripsi"
          value={form.description}
          onChange={handleChange}
          className="border p-3 rounded md:col-span-2"
        />

        <button
          className={`text-white py-3 rounded font-bold md:col-span-2 ${
            editingId
              ? 'bg-yellow-600'
              : 'bg-indigo-600'
          }`}
        >

          {editingId
            ? 'Update Buku'
            : 'Tambah Buku'}

        </button>

      </form>
<div className="mb-6">

  <select
    value={categoryFilter}
    onChange={(e) =>
      setCategoryFilter(
        e.target.value
      )
    }
    className="border p-3 rounded"
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
      <div className="grid gap-4">

        {filteredBooks.map((book) => (

          <div
            key={book._id}
            className="border rounded-xl p-4 flex justify-between items-center"
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
                className="w-20 h-28 object-cover rounded"
              />

              <div>

                <h3 className="font-bold text-xl">
                  {book.title}
                </h3>

                <p>
                  {book.author}
                </p>

                <p className="text-sm text-gray-500">
                  {book.category}
                </p>

                <p className="text-sm">
                  Stock:
                  {' '}
                  {book.availableCopies}
                </p>

              </div>

            </div>

            <div className="flex gap-4">

              <button
                onClick={() => handleEdit(book)}
                className="text-yellow-600 text-xl"
              >
                <FaEdit />
              </button>

              <button
                onClick={() =>
                  handleDelete(book._id)
                }
                className="text-red-600 text-xl"
              >
                <FaTrash />
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

};

export default BookManagement;