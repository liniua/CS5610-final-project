

var mongoose = require("mongoose");

var WidgetSchema = require("./widget.schema.server");
var PageModel = require("../page/page.model.server");
var WidgetModel = mongoose.model('WidgetModel', WidgetSchema);

WidgetModel.createWidget = createWidget;
WidgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
WidgetModel.findWidgetById = findWidgetById;
WidgetModel.updateWidget = updateWidget;
WidgetModel.deleteWidget = deleteWidget;
WidgetModel.reorderWidget = reorderWidget;

module.exports = WidgetModel;

function createWidget(pageId, Widget) {

  return WidgetModel.create(Widget)
    .then(function(responseWidget){
      PageModel.findPageById(responseWidget.pageId)
        .then(function(page){
          page.widgets.push(responseWidget);
          return page.save();
        });
      return responseWidget;
    });
}

function findAllWidgetsForPage(pageId) {
  // return WidgetModel.find({'pageId' : pageId})
  //   .populate('pageId').exec();
  return PageModel
    .findPageById(pageId)
    .populate('widgets')
    .then(
      function (page) {
        // console.log(page.widgets);
        return page.widgets;
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
    PageModel.findPageById(widget.pageId).then(function(page){
      page.widgets.pull({_id: widgetId});
      page.save();
    })
  });
  return WidgetModel.deleteOne({_id: widgetId});
}

function reorderWidget(pageId, start, end) {
  return PageModel.findPageById(pageId).then(
    function(page) {
      console.log("wigs: ");
      for (let w of page.widgets) {
        console.log(w);
      }
      page.widgets.splice(end, 0, page.widgets.splice(start, 1)[0]);
      console.log("after wigs: ");
      for (let w of page.widgets) {
        console.log(w);
      }
      return page.save();
    }
  )
}
