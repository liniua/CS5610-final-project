

var mongoose = require("mongoose");

var WidgetSchema = require("./widget.schema.server");
var RestaurantModel = require("../restaurant/restaurant.model.server");
var WidgetModel = mongoose.model('WidgetModel', WidgetSchema);

WidgetModel.createWidget = createWidget;
WidgetModel.findAllWidgetsForRest = findAllWidgetsForRest;
WidgetModel.findWidgetById = findWidgetById;
WidgetModel.updateWidget = updateWidget;
WidgetModel.deleteWidget = deleteWidget;
WidgetModel.reorderWidget = reorderWidget;

module.exports = WidgetModel;

function createWidget(rid, Widget) {

  return WidgetModel.create(Widget)
    .then(function(responseWidget){
        RestaurantModel.findRestaurantById(responseWidget.rid)
        .then(function(rest){
            rest.widgets.push(responseWidget);
          return rest.save();
        });
      return responseWidget;
    });
}

function findAllWidgetsForRest(rid) {
  return RestaurantModel.findRestaurantById(rid)
    .populate('widgets')
    .then(
      function (rest) {
        // console.log(result-page.widgets);
        return rest.widgets;
      }
    )
}

function findWidgetById(widgetId) {
  return WidgetModel.findOne({_id: widgetId});
}

function updateWidget(widgetId, widget){
  return WidgetModel.updateOne({_id: widgetId}, widget);
}

function deleteWidget(widgetId) {
  WidgetModel.findWidgetById(widgetId).then(function(widget) {
      RestaurantModel.findRestaurantById(widget.rid).then(function(rest){
      rest.widgets.pull({_id: widgetId});
      rest.save();
    })
  });
  return WidgetModel.deleteOne({_id: widgetId});
}

function reorderWidget(rid, start, end) {
  return RestaurantModel.findRestaurantById(rid).then(
    function(rest) {
      rest.widgets.splice(end, 0, rest.widgets.splice(start, 1)[0]);
      return rest.save();
    }
  )
}
