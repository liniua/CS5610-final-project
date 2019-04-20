var mongoose = require('mongoose');

var WidgetModel = require('../widget/widget.schema.server');
var RestaurantSchema = mongoose.Schema({
  name: String,
  ownerId: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
  description: String,
  widgets: [
    {type: mongoose.Schema.Types.ObjectId, ref: 'WidgetModel'}
  ],
  dateCreated: {
    type: Date,
    default: Date.now(),
  }
}, {collection: 'restaurants'});

module.exports = RestaurantSchema;
