<<<<<<< HEAD
// src/pages/BookDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBook } from '../api/bookService';

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getBook(id);
        setBook(data);
      } catch (err) {
        console.error('Error loading book:', err);
        alert('Failed to load book');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) return <p>Loading book details...</p>;
  if (!book) return <p>Book not found</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '600px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      {book.description && <p><strong>Description:</strong> {book.description}</p>}
      {book.publishedDate && <p><strong>Published Date:</strong> {new Date(book.publishedDate).toLocaleDateString()}</p>}
      {book.isbn && <p><strong>ISBN:</strong> {book.isbn}</p>}
      <p><strong>Price:</strong> ${book.price?.toFixed?.(2) ?? book.price}</p>
      <p><strong>In Stock:</strong> {book.inStock ? 'Yes' : 'No'}</p>
      {book.tags && book.tags.length > 0 && (
        <p><strong>Tags:</strong> {book.tags.join(', ')}</p>
      )}

      <div style={{ marginTop: '20px' }}>
        <button onClick={() => navigate(`/books/edit/${book._id}`)} style={{ marginRight: '10px', padding: '6px 12px' }}>
          Edit
        </button>
        <button onClick={() => navigate('/books')} style={{ padding: '6px 12px' }}>
          Back to List
        </button>
      </div>
    </div>
  );
}
=======
// src/pages/BookDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBook } from '../api/bookService';

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getBook(id);
        setBook(data);
      } catch (err) {
        console.error('Error loading book:', err);
        alert('Failed to load book');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) return <p>Loading book details...</p>;
  if (!book) return <p>Book not found</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '600px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      {book.description && <p><strong>Description:</strong> {book.description}</p>}
      {book.publishedDate && <p><strong>Published Date:</strong> {new Date(book.publishedDate).toLocaleDateString()}</p>}
      {book.isbn && <p><strong>ISBN:</strong> {book.isbn}</p>}
      <p><strong>Price:</strong> ${book.price?.toFixed?.(2) ?? book.price}</p>
      <p><strong>In Stock:</strong> {book.inStock ? 'Yes' : 'No'}</p>
      {book.tags && book.tags.length > 0 && (
        <p><strong>Tags:</strong> {book.tags.join(', ')}</p>
      )}

      <div style={{ marginTop: '20px' }}>
        <button onClick={() => navigate(`/books/edit/${book._id}`)} style={{ marginRight: '10px', padding: '6px 12px' }}>
          Edit
        </button>
        <button onClick={() => navigate('/books')} style={{ padding: '6px 12px' }}>
          Back to List
        </button>
      </div>
    </div>
  );
}
>>>>>>> 5537394c1179184fef942c783d9e1af1aeb1d7eb
