const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
  },
  recommended: {
    type: String,
    enum: ['Yes', 'No'],
    required: true,
  },
  comments: {
    type: String,
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
