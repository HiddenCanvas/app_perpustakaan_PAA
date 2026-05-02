import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import BookDetailModal from './BookDetailModal';
import MyLoans from './MyLoans';
import MyFines from './MyFines';

const BookCatalog = () => {

  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

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

const handleBorrow = async (bookId) => {
  try {

    await api.post('/loans/borrow', {
      bookId,
    });

    alert('Buku berhasil dipinjam');

    fetchBooks();

  } catch (err) {

    console.error(err);

    alert(
      err.response?.data?.message ||
      'Gagal meminjam buku'
    );

  }
};
  return (
    <div className="p-6 max-w-7xl mx-auto">

      <h1 className="text-4xl font-bold mb-10">
        Katalog Buku
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {books.map((book) => (

          <div
            key={book._id}
            className="bg-white rounded-xl shadow overflow-hidden"
          >

        <img
        src={
            book.coverImage &&
            book.coverImage !== '-'
            ? book.coverImage
            : 'https://via.placeholder.com/300x400?text=No+Cover'
        }
        alt={book.title}
        className="h-72 w-full object-cover"
        />
            <div className="p-4">

              <h3 className="font-bold text-lg">
                {book.title}
              </h3>

              <p className="text-sm text-gray-500 mb-2">
                {book.author}
              </p>

              <p className="text-sm mb-4">
                Stok: {book.availableCopies}
              </p>

              <div className="flex gap-2">

                <button
                  onClick={() => setSelectedBook(book)}
                  className="flex-1 bg-gray-200 py-2 rounded"
                >
                  Detail
                </button>

                <button
                  onClick={() => handleBorrow(book._id)}
                  disabled={book.availableCopies === 0}
                  className="flex-1 bg-teal-600 text-white py-2 rounded disabled:bg-gray-300"
                >
                  Pinjam
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

      <BookDetailModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
      />
    <MyLoans />

    <MyFines />
    </div>
  );
};

export default BookCatalog;