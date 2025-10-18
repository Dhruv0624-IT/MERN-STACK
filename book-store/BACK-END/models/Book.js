const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  publishedDate: { type: Date },
  isbn: { type: String, trim: true },
  price: { type: Number, default: 0 },
  inStock: { type: Boolean, default: true },
  tags: [String]
}, { timestamps: true });

module.exports = mongoose.model('Book', BookSchema);
