const express = require('express');
const models = require('../models');
const passport = require('passport');
const router = express.Router();



router.post('/login', (req, res) => {
  passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
  })(req, res);
})

router.get('/logout',
 (req, res) => {
   req.logout();
   res.redirect('/');
});

router.post('/protected',
passport.redirectIfNotLoggedIn('/login'),
  (req, res) => {
    req.user
    res.send('secrets');
});

router.put('/:id', (req, res) => {
  res.json({
    msg: "Successful PUT to '/' route",
    id: req.params.id
  });
});

router.delete('/:id', (req, res) => {
  res.json({
    msg: "Successful DELETE to '/' route",
    id: req.params.id
  });
});


module.exports = router;
