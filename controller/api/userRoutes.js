const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const { Post, User, Comment } = require('../../models');

const saltRounds = 14;



router.post('/login', async (req, res) => {

  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    console.log("User", user)

    if (!user) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    if (user) {
      console.log("req",req.body.password)
      console.log("User p", user.password)
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(req.body.password, user.password);

      if (!validPassword) {
        res.status(400).json({ error: "Invalid Password" });
      } else {
        req.session.save(() => {
        req.session.user_id = user.id;
        req.session.logged_in = true;
        
        res.redirect('/');
      })
    }
    }
      
    }  catch (err) {
    res.status(400).json(err);
  }

});

router.post('/register', (req, res) => {
  console.log(req.body)
  try {
    bcrypt.hash(req.body.password, saltRounds, function (err,   hash) {
       User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash
        })
        .then(function(data) {
         if (data) {
         res.redirect('/');
         }
       });
      });
      } catch (err) {
    res.status(400).json(err);
  }

});

router.post('/logout', (req, res) => {

  console.log('logging out')
  if (req.session.logged_in) {
    req.session.destroy(err => {
      if (err) {
        res.status(400).send('Unable to log out')
      } else {
        res.redirect('/');
      }
    });
  } else {
    res.redirect('/');
  }
  
});





  module.exports = router;