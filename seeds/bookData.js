const { Book } = require('../models');


const bookData = [
  {
    name: 'JavaScript: The Good Parts',
    author: 'Douglas Crockford',
    description: 'Most programming languages contain good and bad parts, but JavaScript has more than its share of the bad, having been developed and released in a hurry before it could be refined.',
    release_date: '2008-05-08',
    image_link: 'https://books.google.com/books/content?id=ptiYBAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    user_id: 1
  },
  {
    name: 'Eloquent JavaScript',
    author: 'Marijn Haverbeke',
    description: 'Diving deep into the JavaScript language to show you how to write beautiful, effective code, this book uses extensive examples and immerses you in code from the start, while exercises and full-chapter projects give you hands-on experience with writing your own programs. --',
    release_date: '2018-11-15',
    image_link: 'https://books.google.com/books/content?id=p1v6DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    user_id: 2
  },
  {
    name: 'Effective JavaScript',
    author: 'David Herman',
    description: 'Provides information on how to write better JavaScript programs, covering such topics as functions, arrays, library and API design, and concurrency.',
    release_date: '2013',
    image_link: 'https://books.google.com/books/content?id=Nz9iAwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    user_id: 3
  }
];

const seedBook = () => Book.bulkCreate(bookData);

module.exports = seedBook;