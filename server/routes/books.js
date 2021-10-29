/* File name: books.js
   Author name: Heylisse Machado 
   Student ID: 301155124
   Web App name: COMP229-W2020-MidTerm-301155124 */

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find((err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

  book.find((err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/details', {
        title: 'Add book',
        page: 'books/details',
        books: books
      });
    }
  })

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

  let updatedItem = new book({

    "Title": req.body.title,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre,
  });
  book.create(updatedItem, (err) => {
    if (err) {
      console.error(err);
      res.end(err);
    }
    ;
    res.redirect('/books');
  });

});

// GET the Book Details page in order to edit an existing Book - EDIT
router.get('/:id', (req, res, next) => {

  let id = req.params.id;


book.findById(id, (err, updatedItem) => {
  if (err) {
    console.error(err);
    res.end(err);
  }

  res.render('books/details', {
    title: 'Books',
    books: updatedItem
  });
});
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

  let newItem = new book({

    "Title": req.body.title,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre,
  });
  book.create(newItem, (err) => {
    if (err) {
      console.error(err);
      res.end(err);
    }

    res.redirect('/books')
  });

});

// GET - process the delete by user id - DELETE
router.get('/delete/:id', (req, res, next) => {

  let id = req.params.id;
  book.remove({ _id: id }, (err) => {
    if (err) {
      console.error(err);
      res.end(err);
    }
    res.redirect('/books');
  });

});


module.exports = router;
