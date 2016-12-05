'use strict';

// .join('<table>', 'wherethis', 'equalsthis');

const express = require('express');
const knex = require('../knex');
const bodyParser = require('body-parser');
var {camelizeKeys, decamelizeKeys} = require('humps');

// eslint-disable-next-line new-cap
const router = express.Router();
router.use(bodyParser.json());

// YOUR CODE HERE
router.get('/', (req, res) => {
  knex('favorites').join('books', 'favorites.book_id', 'books.id').then((data) => {
    res.send(camelizeKeys(data));
  });
});

router.get('/check?', (req, res) => {
  var bookId = req.query['bookId'];

  knex('favorites').where('book_id', bookId).then((data) => {
    if(data.length > 0) {
      res.send(true);
    }else{
      res.send(false);
    }
  });
});

router.post('/', (req, res) => {
  var bookId = req.body.bookId;
  knex('favorites').insert({
    book_id: bookId,
    user_id: 1,
  }, '*').then((confirmation) => {
    delete confirmation[0].created_at;
    delete confirmation[0].updated_at;
    res.send(camelizeKeys(confirmation[0]));
  });
});

router.delete('/', (req, res) => {
  var bookId = req.body.bookId;

  var tbd;
  knex('favorites').where('book_id', bookId).then((data) => {
    tbd = data[0];
  });

  knex('favorites').del().where('book_id', bookId).then(() => {

    if(tbd.length > 0){
      delete tbd.created_at;
      delete tbd.updated_at;
      delete tbd.id;

      res.send(tbd);
    } else {
      res.send('No books found');
    }

  });

});

module.exports = router;
