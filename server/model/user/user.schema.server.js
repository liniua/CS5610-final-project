
var mongoose = require('mongoose');
var restaurantSchema = require('../restaurant/restaurant.schema.server');


var userSchema = mongoose.Schema({
        username: String,
        password: String,
        userType:{type: String, enum: ['ADMIN', 'RESTAURANT', 'USER']},
        firstName: String,
        lastName: String,
        email: String,
        employeePermit: String,
        description: String,
        restaurants: [restaurantSchema],
        facebook: {
            id: String,
            token: String
        },
        dateCreate:{type: Date, default: Date.now()}
    },{collection: "Restaurants"}
);

module.exports = userSchema;



