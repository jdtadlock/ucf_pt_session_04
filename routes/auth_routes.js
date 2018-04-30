const router = require('express').Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');


// passport.authenticate() --> Log the user in after checking user information
passport.use(new LocalStrategy({
  usernameField: 'email'
}, (email, password, done) => {
  User.findOne({email: email})
    .then(user => {
      if ( !user ) done(null, false);

      if ( !user.comparePassword(password) ) done(null, false);

      done(null, {
        id: user._id,
        email: user.email
      });
    });
}));

passport.serializeUser(function (user_id, done) {
  done(null, user_id);
});

passport.deserializeUser(function (user_id, done) {
  done(null, user_id);
});


// ROUTES
router.post('/register', (req, res) => {
  User.create(req.body)
    .then(user => {
      req.login({
        id: user._id,
        email: user.email
      }, err => {
        if ( err ) return res.status(500).send({error: err});

        res.send(req.user);
      });
    }).catch(err => res.status(500).send({error: 'User could not be created.'}));
});

router.post('/login', (req, res) => {
  // break down req.body into email and password
  passport.authenticate('local')(req, res, result => {
    res.status(200).send(req.user);
  })
});

router.get('/isauth', (req, res) => {
  if ( req.user ) res.send(req.user);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.send();
})

module.exports = router;