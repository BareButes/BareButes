const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Users = require('../models').User;

function passwordsMatch(passwordSubmitted, storedPassword) {
  return bcrypt.compareSync(passwordSubmitted, storedPassword);
}

// Using passport to authenticate user credentials
passport.use(new LocalStrategy({
    usernameField: 'email',
  },
  (email, password, done) => {
    Users.findOne({
      where: { email },
    }).then((user) => {
      // second param is bool value for whether or not they should be logged in
      // with provided credentials
      if (!user || passwordsMatch(password, user.password) === false) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user, { message: 'Successfully Logged In!' });
    });
  })
);


// Following two functions enable session cookies to allow log-in persistence
// You can use this or json web tokens (JWT)
// serialize cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// find cookie, deserialize cookie, get user info
passport.deserializeUser((id, done) => {
  Users.findById(id).then((user) => {
    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  });
});

passport.redirectIfLoggedIn = (route) =>
  (req, res, next) => (req.user ? res.redirect(route) : next());

passport.redirectIfNotLoggedIn = (route) =>
  (req, res, next) => (req.user ? next() : res.redirect(route));

module.exports = passport;