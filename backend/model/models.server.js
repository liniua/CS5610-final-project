var mongoose = require('mongoose');
//used in local machine
// var db = mongoose.connect('mongodb://localhost:27017/webdev');

//used in heroku
var db = mongoose.connect('mongodb://<webdev-nanliu-cs5610>:<webdev-nanliu-cs5610>@ds051615.mlab.com:51615/heroku_2hdv4wjv');

module.exports = db;
