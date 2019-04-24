var mongoose = require("mongoose");
var restaurantSchema = require('../restaurant/restaurant.schema.server');

var UserSchema = mongoose.Schema({
  username: String,
  password: String,
  userType: String,
  firstName:String,
  lastName: String,
  email: String,
  phone: String,
  restaurants:[
    restaurantSchema
  ],
  facebook : {
    token: String,
    id: String,
  },
  dateCreated: {
    type:Date,
    default: Date.now(),
  },
}, {collection:'user'});

module.exports = UserSchema;
