<<<<<<< HEAD
const mongoose = require('mongoose');
const Book = require('../models/Book');

// List all books
exports.listBooks = async (req, res) => {
  try {
    const { q, tag } = req.query;
    const filter = {};

    if (q) {
      const re = new RegExp(q, 'i');
      filter.$or = [
        { title: re },
        { author: re },
        { description: re },
        { isbn: re },
      ];
    }

    if (tag) filter.tags = tag;

    const books = await Book.find(filter).sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (err) {
    console.error(' Error in listBooks:', err);
    res.status(500).json({ message: 'Server error fetching books', error: err.message });
  }
};

// Get single book
exports.getBook = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid book ID' });

    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    res.status(200).json(book);
  } catch (err) {
    console.error(' Error in getBook:', err);
    res.status(500).json({ message: 'Server error fetching book', error: err.message });
  }
};

// Create book
exports.createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    const saved = await book.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(' Error in createBook:', err);
    res.status(400).json({ message: 'Error creating book', error: err.message });
  }
};

// Update book
exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid book ID' });

    const updated = await Book.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Book not found' });

    res.status(200).json(updated);
  } catch (err) {
    console.error(' Error in updateBook:', err);
    res.status(400).json({ message: 'Error updating book', error: err.message });
  }
};

// Delete book
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid book ID' });

    const removed = await Book.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ message: 'Book not found' });

    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    console.error(' Error in deleteBook:', err);
    res.status(500).json({ message: 'Error deleting book', error: err.message });
  }
};
=======
const mongoose = require('mongoose');
const Book = require('../models/Book');

// List all books
exports.listBooks = async (req, res) => {
  try {
    const { q, tag } = req.query;
    const filter = {};

    if (q) {
      const re = new RegExp(q, 'i');
      filter.$or = [
        { title: re },
        { author: re },
        { description: re },
        { isbn: re },
      ];
    }

    if (tag) filter.tags = tag;

    const books = await Book.find(filter).sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (err) {
    console.error(' Error in listBooks:', err);
    res.status(500).json({ message: 'Server error fetching books', error: err.message });
  }
};

// Get single book
exports.getBook = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid book ID' });

    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    res.status(200).json(book);
  } catch (err) {
    console.error(' Error in getBook:', err);
    res.status(500).json({ message: 'Server error fetching book', error: err.message });
  }
};

// Create book
exports.createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    const saved = await book.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(' Error in createBook:', err);
    res.status(400).json({ message: 'Error creating book', error: err.message });
  }
};

// Update book
exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid book ID' });

    const updated = await Book.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Book not found' });

    res.status(200).json(updated);
  } catch (err) {
    console.error(' Error in updateBook:', err);
    res.status(400).json({ message: 'Error updating book', error: err.message });
  }
};

// Delete book
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid book ID' });

    const removed = await Book.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ message: 'Book not found' });

    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    console.error(' Error in deleteBook:', err);
    res.status(500).json({ message: 'Error deleting book', error: err.message });
  }
};
>>>>>>> 5537394c1179184fef942c783d9e1af1aeb1d7eb
