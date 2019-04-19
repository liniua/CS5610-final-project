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

const port = process.env.PORT || '8080';
app.set('port', port);



// mongodb://<dbuser>:<dbpassword>@ds113505.mlab.com:13505/webdev
//var connectionString = 'mongodb://127.0.0.1:27017/webdev';
var connectionString = 'mongodb://webdev-nanliu-cs5610:webdev-nanliu-cs5610@ds051615.mlab.com:51615/heroku_2hdv4wjv';
//var connectionString = 'mongodb://webappmaker:webappmaker@ds163181.mlab.com:63181/webappmaker';
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const client = mongoose.connect( connectionString, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Create HTTP services
const server = http.createServer(app);
require('./assignment/app')(app);
server.listen( port , () => console.log('Running on port 8080'));

/*var dbServer = require('./test-mongodb/app');
dbServer(app);*/

//require('./test-mongodb/app')(app);

// app.get('/api/hello', function (req, res) {
//   console.log("Get hello api call!");
//   res.send("Hello world!");})

// whenever add a new api request, restart the services.

// For Build: Catch all other routes and return the index file -- BUILDING

// app.get('/api/hello', function (req, res) {
//  res.sendFile(path.join(__dirname, 'dist/index.html'));
// });


// include a file ./assignment/app


//app.listen(port, () => console.log('Running on port 8080'));
