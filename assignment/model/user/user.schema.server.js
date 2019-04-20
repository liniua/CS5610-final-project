var mongoose = require("mongoose");
var RestaurantModel = require('../restaurant/restaurant.schema.server')

var UserSchema = mongoose.Schema({
  username: String,
  password: String,
  userType: String,
  firstName:String,
  lastName: String,
  email: String,
  phone: String,
  restaurants:[
    {type: mongoose.Schema.Types.ObjectId, ref: 'RestaurantModel'}
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
