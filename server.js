const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const auth_routes = require('./routes/auth_routes');
const port = process.env.PORT || 5000;
const config = require('./config');

mongoose.connect('mongodb://localhost/ucf_04');
mongoose.Promise = Promise;

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(session({
  secret: config.secret,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/', auth_routes);

app.listen(port, () => console.log(`Listening on port ${port}`));