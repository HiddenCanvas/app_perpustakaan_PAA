import React from 'react';

const BookDetailModal = ({ book, onClose }) => {

  if (!book) return null;

  const imageUrl =
    book.coverImage &&
    book.coverImage !== '-'
      ? book.coverImage
      : 'https://via.placeholder.com/400x600?text=No+Cover';

  return (

    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">

      <div className="bg-white w-full max-w-5xl rounded-2xl overflow-hidden relative max-h-[95vh] overflow-y-auto">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-black"
        >
          ×
        </button>

        <div className="grid md:grid-cols-2 gap-8 p-6">

          <div>

            <img
              src={imageUrl}
              alt={book.title}
              className="w-full h-[600px] object-cover rounded-xl shadow"
            />

          </div>

          <div>

            <h1 className="text-4xl font-black mb-3">
              {book.title}
            </h1>

            <p className="text-lg text-gray-600 mb-6">
              oleh {book.author}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">

              <div className="bg-gray-100 p-4 rounded-xl">
                <p className="text-sm text-gray-500">
                  Kategori
                </p>

                <p className="font-bold">
                  {book.category}
                </p>
              </div>

              <div className="bg-gray-100 p-4 rounded-xl">
                <p className="text-sm text-gray-500">
                  Tahun
                </p>

                <p className="font-bold">
                  {book.publishYear}
                </p>
              </div>

              <div className="bg-gray-100 p-4 rounded-xl">
                <p className="text-sm text-gray-500">
                  Halaman
                </p>

                <p className="font-bold">
                  {book.pages}
                </p>
              </div>

              <div className="bg-gray-100 p-4 rounded-xl">
                <p className="text-sm text-gray-500">
                  Stok
                </p>

                <p className="font-bold">
                  {book.availableCopies}
                </p>
              </div>

            </div>

            <div className="mb-5">

              <h3 className="text-xl font-bold mb-2">
                Informasi Buku
              </h3>

              <div className="space-y-2 text-gray-700">

                <p>
                  <b>Publisher:</b> {book.publisher}
                </p>

                <p>
                  <b>ISBN:</b> {book.isbn}
                </p>

                <p>
                  <b>Lokasi Rak:</b> {book.location}
                </p>

                <p>
                  <b>Rating:</b> {book.rating || 0}
                </p>

              </div>

            </div>

            <div>

              <h3 className="text-xl font-bold mb-2">
                Deskripsi
              </h3>

              <p className="text-gray-700 leading-relaxed">
                {book.description || 'Tidak ada deskripsi'}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default BookDetailModal;