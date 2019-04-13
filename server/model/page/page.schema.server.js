
var mongoose = require('mongoose');
var widgetSchema = require('../widget/widget.schema.server');

var pageSchema = mongoose.Schema({
        name: String,
        developerId: {type: mongoose.Schema.ObjectId, ref: "User"},
        restaurantId: {type: mongoose.Schema.ObjectId, ref: "Restaurant"},
        description: String,
        pageType:{type: String, enum: ['ADMIN', 'RESTAURANT', 'USER']},
        showThisPage: Boolean,
        widgets: [widgetSchema],
        dateCreate:{type: Date, default: Date.now()}
    },{collection: "Pages"}
);

module.exports = pageSchema;



