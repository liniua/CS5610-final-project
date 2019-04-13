var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var pageModel = require('../page/page.model.server');
var widgetModel = mongoose.model("Widgets", widgetSchema);

module.exports = widgetModel;
widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.deleteWidget = deleteWidget;
widgetModel.updateWidget = updateWidget;
widgetModel.reorderWidget = reorderWidget;


function createWidget(pageId,widget) {
    return widgetModel.create(widget)
        .then(
            function (newWidget) {
                pageModel.findPageById(pageId)
                    .then(
                        function (page) {
                            page.widgets.push(newWidget);
                            pageModel.updatePage(pageId,page);
                        }
                    );
                return newWidget;
            }
        );
}

function findAllWidgetsForPage(pageId) {
    return widgetModel.find({pageId: pageId});
}

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}

function updateWidget(widgetId, widget) {
    return widgetModel.findByIdAndUpdate(widgetId,widget);
}

function deleteWidget(widgetId) {
    return widgetModel.findByIdAndDelete(widgetId);
}

// function changeOrderOfWidgets(req, res){
//   console.log("I am changing the order of items");
//
//   var startIndex = parseInt(req.query["start"]);
//   var endIndex = parseInt(req.query["end"]);
//   array_swap(widgets, startIndex, endIndex);
//   res.json(widgets);
// }
// function array_swap(arr, old_index, new_index) {
//   while (old_index < 0) {
//     old_index += arr.length;
//   }
//   while (new_index < 0) {
//     new_index += arr.length;
//   }
//   if (new_index >= arr.length) {
//     var k = new_index - arr.length + 1;
//     while (k--) {
//       arr.push(undefined);
//     }
//   }
//   arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
// };


function updatePosition (pageId, start, end) {
    return widgetModel.find({pageId: pageId}).then(
        function(wigs){
            widgetModel.findOneAndUpdate({_id: wigs[start]._id}, {position: end+1},{new: true}).then(
                function(wig){
                    console.log(wig);
                    wigs[start] = wig;

                }
            )
            widgetModel.findOneAndUpdate({_id: wigs[end]._id}, {position: start+1},{new: true}).then(
                function(wig){
                    console.log(wig);
                    wigs[end] = wig;

                }
            )
            console.log(wigs[start]);
            console.log(wigs[end]);
            pageModel.findPageById(pageId).then(
                function(page){
                    page.widgets = wigs;
                    pageModel.updatePage(pageId,page);
                }
            )
            return wigs;
        }

    )
}

function reorderWidget(pageId,start,end) {
    return updatePosition(pageId,start,end);

}
