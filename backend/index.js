const port = process.env.PORT || 8080; 
const host = process.env.HOST || '127.0.0.1';

const express = require('express');
const app = express();
global.urlBase = `127.0.0.1`;

var passport   = require('passport')
var session    = require('express-session')
const bodyParser = require('body-parser');
const validator = require('express-validator');
const sanitizer = require('express-sanitizer');
//const session = require('express-session');
var env = require('dotenv').config();
const cors = require('cors');
const corsOptions ={
  origin: true, 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(sanitizer());
app.use(cors(corsOptions));
//app.use(validator());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({ secret: 'iu',resave: true, saveUninitialized:true})); // session secret

 
app.use(passport.initialize());
 
app.use(passport.session()); // persistent login sessions


app.use('/', require('./routes/main.routes'));

app.listen(port, function(err) {
    if (!err) {
      console.log('Your app is listening on ' + host + ' and port ' + port);
      console.log(4*-1);
    }
    else {
      console.log(err);
    }
  }
);

module.exports = app;