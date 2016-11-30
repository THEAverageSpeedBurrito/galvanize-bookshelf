'use strict';

const express = require('express');
const knex = require('../knex');
const bodyParser = require('body-parser');

// eslint-disable-next-line new-cap
const router = express.Router();

router.use(bodyParser.json());
// YOUR CODE HERE

router.post('/', (req, res, next) => {
  var {first_name, last_name, email, hashed_password} = req.body;

  knex('users').insert({
    first_name,
    last_name,
    email,
    hashed_password
  }).then((users) => {
    res.send(users[0]);
  });

});

module.exports = router;
