const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Users = require('../models').User;

function passwordsMatch(passwordSubmitted, storedPassword) {
  return bcrypt.compareSync(passwordSubmitted, storedPassword);
}

passport.use(new LocalStrategy({
    usernameField: 'email',
  },
  (email, password, done) => {

    Users.findOne({
      where: { email },
    }).then((user) => {
      //console.log(user);
      console.log(email);
      console.log(password);
      if(!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }

      console.log("I SHOULD NOT BE HERE");
      console.log(password)

      if (passwordsMatch(password, user.password_hash) === false) {
        
        return done(null, false, { message: 'Incorrect password.' });
      }


      return done(null, user, { message: 'Successfully Logged In!' });
    });
  })
);


//f\serialize user property into a cookie
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



