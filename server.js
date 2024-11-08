const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
const path = require('path');
const methodOverride = require('method-override');
require('dotenv').config();
let dbString = process.env.DB_STRING;

const mongoose = require('mongoose');

const Book = require('./models/book');

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbString);
  console.log('CONNECTED TO DATABASE');
}

app.set('views', path.join('views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/books', async (req, res) => {
  let books = await Book.find({});
  res.render('./books/index', { books });
});

app.get('/books/new', (req, res) => {
  res.render('./books/new');
});

app.post('/books', async (req, res) => {
  const newBook = new Book(req.body);
  await newBook.save();
  res.redirect('/books');
});

app.get('/books/:id', async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);
  res.render('./books/show', { book });
});

app.get('/books/:id/edit', async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);
  res.render('./books/edit', { book });
});

app.put('/books/:id', async (req, res) => {
  const { id } = req.params;
  await Book.findByIdAndUpdate(id, req.body);
  res.redirect('/books');
});

app.delete('/books/:id', async (req, res) => {
  const { id } = req.params;
  await Book.findByIdAndDelete(id);
  res.redirect('/books');
});
app.listen(process.env.PORT || PORT, () => {
  console.log(`LISTENING ON PORT ${PORT}`);
});

// TODO
//  add update route
// add update page
