const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../models');

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route

  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});


router.get('/register', (req, res) => {
  // If the user is already logged in, redirect the request to another route

  console.log("register")
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('register');
});



module.exports=router