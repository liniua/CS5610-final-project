
var mongoose = require('mongoose');
var pageSchema = require('../page/page.schema.server');

var restaurantSchema = mongoose.Schema({
        name: String,
        userId: {type: mongoose.Schema.ObjectId, ref: "User"},
        type: String,
        description: String,
        restaurantUrl: String,
        address: String,
        city: String,
        zip:  String,
        adsFee: Number,
        page: [pageSchema],
        dateCreate:{type: Date, default: Date.now()}
    },{collection: "Restaurants"}
);

module.exports = restaurantSchema;










