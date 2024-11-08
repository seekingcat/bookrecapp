const mongoose = require('mongoose');
require('dotenv').config();
let dbString = process.env.DB_STRING;

const Book = require('./models/book');

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbString);
  console.log('CONNECTED TO DATABASE');

  let seedBooks = [
    {
      name: 'To Kill A Mockingbird',
      author: 'Harper Lee',
      rating: 4.3,
      recommended: 'Yes',
      comments:
        'There are few books where the beginning paragraphs hit a home run for me, and this is one of them.',
    },
    {
      name: '1984',
      author: 'George Orwell',
      rating: 4.1,
      recommended: 'Yes',
      comments:
        'I got the chills so many times toward the end of this book. It completely blew my mind. It managed to surpass my high expectations AND be nothing at all like I expected.',
    },
    {
      name: "Harry Potter and the Sorcerer's Stone",
      author: 'J.K. Rowling',
      rating: 2.4,
      recommended: 'No',
      comments: "Don't support horrible people",
    },
    {
      name: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      rating: 3.9,
      recommended: 'Yes',
      comments:
        'Fitzgerald can set a scene so perfectly, flawlessly. He paints a world of magic and introduces one of the greatest characters of all time, Jay Gatsby. Gatsby is the embodiment of hope',
    },
  ];

  await Book.insertMany(seedBooks);
}
