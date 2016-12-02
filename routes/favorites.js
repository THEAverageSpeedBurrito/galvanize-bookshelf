'use strict';

const express = require('express');
const knex = require('../knex');

// eslint-disable-next-line new-cap
const router = express.Router();

// YOUR CODE HERE
router.get('/', (req, res) => {
  knex('favorites').then((data) => {
    res.send(data[0]);
  });
});


module.exports = router;
