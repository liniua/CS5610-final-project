// Get the dependencies


const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();

const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(cookieParser());
// app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(session({
  secret: 'mysecret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); //configure passport's session support

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Point static path to dist -- For building -- REMOVE
app.use(express.static(path.join(__dirname, 'dist/my-project')));


// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("X-Frame-Options", "ALLOW-FROM http://www.youtube.com)");
  next(); // when setup headers finished, go to the next header and setup
});

const port = process.env.PORT || '3200';
app.set('port', port);


//var connectionString = 'mongodb://127.0.0.1:27017/webdev';
var connectionString = 'mongodb://5610-final-project:5610-final-project@ds145916.mlab.com:45916/heroku_6v78qj90';
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const client = mongoose.connect( connectionString, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Create HTTP services
const server = http.createServer(app);
require('./backend/app')(app);
server.listen( port , () => console.log('Running on port 3200'));
