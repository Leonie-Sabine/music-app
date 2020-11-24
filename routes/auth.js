const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const User = require('../models/User');
const passport = require('passport');

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.get('/login', (req, res) => {
  res.render('auth/login');

});


router.get('/videos', (req, res) => {
  res.render('auth/videos');
});


/* 
router.get('/form', (req, res) => {
  res.render('auth/form');
});
router.post('/', (req, res, next) => {
  const { link } = req.body;
  Video.create({
    link,
    owner: req.user._id, 
    rating: 0 
  })
     .then(video => {
      res.redirect('/auth/videos') 
    }) 
    .catch(error => {
      next(error);
    })
}); */ 



router.get(

  "/google",

  passport.authenticate("google", {

    scope: [

      "https://www.googleapis.com/auth/userinfo.profile",

      "https://www.googleapis.com/auth/userinfo.email"

    ]

  })

);

router.get(

  "/google/callback",

  passport.authenticate("google", {

    successRedirect: "/",

    failureRedirect: "/login" // here you would redirect to the login page using traditional login approach

  })

);



router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    passReqToCallback: true
  })
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})



router.post('/signup', (req, res, next) => {
  const { username, password } = req.body;
  if (password.length < 8) {
    res.render('auth/signup', {
      message: 'Your password must be 8 characters minimun.'
    });
    return;
  }
  if (username === '') {
    res.render('auth/signup', { message: 'Your username cannot be empty' });
    return;
  }
  User.findOne({ username: username }).then(found => {
    if (found !== null) {
      res.render('auth/signup', { message: 'This username is already taken' });
    } else {
      // we can create a user with the username and password pair
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(password, salt);

      User.create({ username: username, password: hash })
        .then(dbUser => {
          // login with passport 
          req.login(dbUser, err => {
            if (err) {
              next(err);
            } else {
              res.redirect('/');
            }
          })
        })
        .catch(err => {
          next(err);
        });
    }
  });
});

module.exports = router;