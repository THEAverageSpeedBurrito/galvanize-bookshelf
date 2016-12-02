'use strict';

// res.cookie('<cookie_name>', <cookie_value>, { cookie_options }); -- creates the cookie w/ values
// req.cookies.<cookie_name>; -- gets that cookie w/ name
// res.clearCookie('<cookie_name>'); - deletes cookie w/ name

const express = require('express');
const bodyParser = require('body-parser');
const knex = require('../knex');
const bcrypt = require('bcrypt');
// eslint-disable-next-line new-cap
const router = express.Router();
router.use(bodyParser.json());
// YOUR CODE HERE
var token = false;

router.get('/', (req, res) => {
    if (token) {
        res.send(true);
    } else {
        res.send(false);
    }
});

router.post('/', (req, res) => {

    var {email, password} = req.body;

    if (email && password) {
        knex('users').where('email', email).then((user) => {
            if (user.length === 0) {
                res.send('Bad email or password');
            } else {
                if(bcrypt.compareSync(password, user[0].hashed_password)){
                  token = true;

                  delete user[0].hashed_password;
                  delete user[0].created_at;
                  delete user[0].updated_at;
                  res.send(user[0]);
                }else{
                  res.send('Bad email or password');
                }
            }
        });
    } else {
        res.send('Invalid login parameters');
    }
});

router.delete('/', (req, res) => {
  token = false;
  res.send(true);
});

module.exports = router;
