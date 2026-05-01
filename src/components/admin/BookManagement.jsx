import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { FaTrash, FaSignOutAlt, FaBook } from 'react-icons/fa';

const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: '', author: '', category: '', totalCopies: 1 });
  const { logout } = useAuth();

  const fetchBooks = async () => {
    const res = await api.get('/books');
    setBooks(res.data.data.books);
  };

  useEffect(() => { fetchBooks(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await api.post('/books', form);
      fetchBooks();
      setForm({ title: '', author: '', category: '', totalCopies: 1 });
    } catch (err) { alert('Gagal menambah buku'); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Hapus buku ini?')) {
      await api.delete(`/books/${id}`);
      fetchBooks();
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8 bg-indigo-700 text-white p-4 rounded-lg shadow-lg">
        <h1 className="text-xl font-bold flex items-center gap-2"><FaBook /> Admin Library</h1>
        <button onClick={logout} className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded hover:bg-red-600"><FaSignOutAlt /> Logout</button>
      </div>

      <form onSubmit={handleAdd} className="bg-white p-6 rounded-lg shadow-md mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input type="text" placeholder="Judul" className="border p-2 rounded" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
        <input type="text" placeholder="Penulis" className="border p-2 rounded" value={form.author} onChange={e => setForm({...form, author: e.target.value})} required />
        <input type="text" placeholder="Kategori" className="border p-2 rounded" value={form.category} onChange={e => setForm({...form, category: e.target.value})} required />
        <button className="bg-indigo-600 text-white rounded hover:bg-indigo-800">Tambah</button>
      </form>

      <div className="grid gap-4">
        {books.map(book => (
          <div key={book._id} className="bg-white p-4 rounded shadow flex justify-between items-center border-l-4 border-indigo-500">
            <div>
              <h3 className="font-bold">{book.title}</h3>
              <p className="text-sm text-gray-500">{book.author} | {book.category}</p>
            </div>
            <button onClick={() => handleDelete(book._id)} className="text-red-500"><FaTrash /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookManagement;