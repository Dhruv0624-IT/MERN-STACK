<<<<<<< HEAD
// src/components/BookForm.jsx
import React, { useEffect, useState } from 'react';
import { createBook, getBook, updateBook } from '../api/bookService';
import { useNavigate, useParams } from 'react-router-dom';

export default function BookForm() {
  const { id } = useParams(); // book ID if editing
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: '',
    author: '',
    description: '',
    publishedDate: '',
    isbn: '',
    price: 0,
    inStock: true,
    tags: ''
  });

  // Load book for editing
  useEffect(() => {
    if (!id) return;
    const fetchBook = async () => {
      try {
        const data = await getBook(id);
        setBook({ ...data, tags: data.tags?.join(', ') || '' });
      } catch (err) {
        console.error('Error loading book:', err);
        alert('Failed to load book');
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBook(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...book,
        price: Number(book.price),
        tags: book.tags.split(',').map(t => t.trim()).filter(Boolean)
      };
      if (id) {
        await updateBook(id, payload);
      } else {
        await createBook(payload);
      }
      navigate('/books');
    } catch (err) {
      console.error('Error saving book:', err);
      alert('Failed to save book');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h2>{id ? 'Edit Book' : 'Add Book'}</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Title:</label><br />
          <input type="text" name="title" value={book.title} onChange={handleChange} required />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Author:</label><br />
          <input type="text" name="author" value={book.author} onChange={handleChange} required />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Description:</label><br />
          <textarea name="description" value={book.description} onChange={handleChange}></textarea>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Published Date:</label><br />
          <input type="date" name="publishedDate" value={book.publishedDate?.split('T')[0] || ''} onChange={handleChange} />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>ISBN:</label><br />
          <input type="text" name="isbn" value={book.isbn} onChange={handleChange} />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Price:</label><br />
          <input type="number" name="price" value={book.price} onChange={handleChange} step="0.01" />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>
            <input type="checkbox" name="inStock" checked={book.inStock} onChange={handleChange} /> In Stock
          </label>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Tags (comma-separated):</label><br />
          <input type="text" name="tags" value={book.tags} onChange={handleChange} />
        </div>

        <button type="submit" style={{ padding: '6px 12px' }}>Save</button>
        <button type="button" style={{ marginLeft: 8, padding: '6px 12px' }} onClick={() => navigate('/books')}>Cancel</button>
      </form>
    </div>
  );
}
=======
// src/components/BookForm.jsx
import React, { useEffect, useState } from 'react';
import { createBook, getBook, updateBook } from '../api/bookService';
import { useNavigate, useParams } from 'react-router-dom';

export default function BookForm() {
  const { id } = useParams(); // book ID if editing
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: '',
    author: '',
    description: '',
    publishedDate: '',
    isbn: '',
    price: 0,
    inStock: true,
    tags: ''
  });

  // Load book for editing
  useEffect(() => {
    if (!id) return;
    const fetchBook = async () => {
      try {
        const data = await getBook(id);
        setBook({ ...data, tags: data.tags?.join(', ') || '' });
      } catch (err) {
        console.error('Error loading book:', err);
        alert('Failed to load book');
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBook(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...book,
        price: Number(book.price),
        tags: book.tags.split(',').map(t => t.trim()).filter(Boolean)
      };
      if (id) {
        await updateBook(id, payload);
      } else {
        await createBook(payload);
      }
      navigate('/books');
    } catch (err) {
      console.error('Error saving book:', err);
      alert('Failed to save book');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h2>{id ? 'Edit Book' : 'Add Book'}</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Title:</label><br />
          <input type="text" name="title" value={book.title} onChange={handleChange} required />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Author:</label><br />
          <input type="text" name="author" value={book.author} onChange={handleChange} required />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Description:</label><br />
          <textarea name="description" value={book.description} onChange={handleChange}></textarea>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Published Date:</label><br />
          <input type="date" name="publishedDate" value={book.publishedDate?.split('T')[0] || ''} onChange={handleChange} />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>ISBN:</label><br />
          <input type="text" name="isbn" value={book.isbn} onChange={handleChange} />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Price:</label><br />
          <input type="number" name="price" value={book.price} onChange={handleChange} step="0.01" />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>
            <input type="checkbox" name="inStock" checked={book.inStock} onChange={handleChange} /> In Stock
          </label>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Tags (comma-separated):</label><br />
          <input type="text" name="tags" value={book.tags} onChange={handleChange} />
        </div>

        <button type="submit" style={{ padding: '6px 12px' }}>Save</button>
        <button type="button" style={{ marginLeft: 8, padding: '6px 12px' }} onClick={() => navigate('/books')}>Cancel</button>
      </form>
    </div>
  );
}
>>>>>>> 5537394c1179184fef942c783d9e1af1aeb1d7eb
