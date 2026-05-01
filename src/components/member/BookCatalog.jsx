import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { FaHandHolding, FaSignOutAlt } from 'react-icons/fa';

const BookCatalog = () => {
  const [books, setBooks] = useState([]);
  const [loans, setLoans] = useState([]);
  const { logout } = useAuth();

  const fetchData = async () => {
    const resB = await api.get('/books');
    const resL = await api.get('/loans?myLoans=true');
    setBooks(resB.data.data.books);
    setLoans(resL.data.data.loans);
  };

  useEffect(() => { fetchData(); }, []);

  const handleBorrow = async (bookId) => {
    try {
      await api.post('/loans', { bookId });
      alert('Buku Berhasil Dipinjam!');
      fetchData();
    } catch (err) { alert(err.response?.data?.message || 'Gagal Pinjam'); }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8 bg-teal-600 text-white p-4 rounded-lg">
        <h1 className="text-xl font-bold">Katalog Buku</h1>
        <button onClick={logout} className="bg-white text-teal-700 px-4 py-2 rounded font-bold">Logout</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {books.map(book => (
          <div key={book._id} className="bg-white p-5 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-lg font-bold mb-1">{book.title}</h3>
            <p className="text-gray-600 mb-4 text-sm">Penulis: {book.author}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded">Stok: {book.availableCopies}</span>
              <button 
                onClick={() => handleBorrow(book._id)}
                disabled={book.availableCopies === 0}
                className="bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-teal-700 disabled:bg-gray-300"
              >
                <FaHandHolding /> Pinjam
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookCatalog;