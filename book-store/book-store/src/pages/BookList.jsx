<<<<<<< HEAD
// src/components/BookList.jsx
import React, { useEffect, useState } from 'react';
import { getBooks, deleteBook } from '../api/bookService';
import { Link, useNavigate } from 'react-router-dom';

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  const loadBooks = async () => {
    try {
      const data = await getBooks(q ? { q } : {});
      setBooks(data);
    } catch (err) {
      console.error('Error loading books:', err);
      alert('Failed to load books');
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    try {
      await deleteBook(id);
      setBooks(books.filter(b => b._id !== id));
    } catch (err) {
      console.error('Error deleting book:', err);
      alert('Failed to delete book');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Books</h2>

      <div style={{ marginBottom: '12px' }}>
        <input
          placeholder="Search by title, author, description, or ISBN"
          value={q}
          onChange={e => setQ(e.target.value)}
          style={{ padding: '6px', width: '300px' }}
        />
        <button onClick={loadBooks} style={{ marginLeft: 8, padding: '6px 12px' }}>Search</button>
        <button onClick={() => navigate('/books/new')} style={{ marginLeft: 12, padding: '6px 12px' }}>Add Book</button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '12px' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #333' }}>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
            <th>In Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '10px' }}>No books found</td>
            </tr>
          )}
          {books.map(b => (
            <tr key={b._id} style={{ borderTop: '1px solid #ddd' }}>
              <td><Link to={`/books/${b._id}`}>{b.title}</Link></td>
              <td>{b.author}</td>
              <td>${b.price?.toFixed?.(2) ?? b.price}</td>
              <td>{b.inStock ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => navigate(`/books/edit/${b._id}`)}>Edit</button>
                <button onClick={() => handleDelete(b._id)} style={{ marginLeft: 6 }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
=======
// src/components/BookList.jsx
import React, { useEffect, useState } from 'react';
import { getBooks, deleteBook } from '../api/bookService';
import { Link, useNavigate } from 'react-router-dom';

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  const loadBooks = async () => {
    try {
      const data = await getBooks(q ? { q } : {});
      setBooks(data);
    } catch (err) {
      console.error('Error loading books:', err);
      alert('Failed to load books');
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    try {
      await deleteBook(id);
      setBooks(books.filter(b => b._id !== id));
    } catch (err) {
      console.error('Error deleting book:', err);
      alert('Failed to delete book');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Books</h2>

      <div style={{ marginBottom: '12px' }}>
        <input
          placeholder="Search by title, author, description, or ISBN"
          value={q}
          onChange={e => setQ(e.target.value)}
          style={{ padding: '6px', width: '300px' }}
        />
        <button onClick={loadBooks} style={{ marginLeft: 8, padding: '6px 12px' }}>Search</button>
        <button onClick={() => navigate('/books/new')} style={{ marginLeft: 12, padding: '6px 12px' }}>Add Book</button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '12px' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #333' }}>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
            <th>In Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '10px' }}>No books found</td>
            </tr>
          )}
          {books.map(b => (
            <tr key={b._id} style={{ borderTop: '1px solid #ddd' }}>
              <td><Link to={`/books/${b._id}`}>{b.title}</Link></td>
              <td>{b.author}</td>
              <td>${b.price?.toFixed?.(2) ?? b.price}</td>
              <td>{b.inStock ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => navigate(`/books/edit/${b._id}`)}>Edit</button>
                <button onClick={() => handleDelete(b._id)} style={{ marginLeft: 6 }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
>>>>>>> 5537394c1179184fef942c783d9e1af1aeb1d7eb
