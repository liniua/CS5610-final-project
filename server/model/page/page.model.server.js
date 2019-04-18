var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');

var pageModel = mongoose.model("Page",pageSchema);
var restaurantModel = require('../restaurant/restaurant.model.server');

pageModel.createPageForRestaurant = createPageForRestaurant;
pageModel.findAllPagesForRestaurant = findAllPagesForRestaurant;
pageModel.findAllPagesForUser = findAllPagesForUser;
pageModel.findPageById= findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;

module.exports = pageModel;


/*function createUser(user) {
  return userModel.create(user, function (err, userSchema) {
    if(err){return handleError(err);}
  });
}*/
function createPageForRestaurant(restaurantId, page) {
    console.log("model"+page);
    return pageModel.create(page).then(
        function(newPage){
            restaurantModel.findRestaurantById(restaurantId).then(
                function(restaurant){
                    restaurant.pages.push(newPage);
                    restaurantModel.updateRestaurant(restaurantId,restaurant);
                }
            );
            return newPage;
        }
    );
}
function findAllPagesForRestaurant(restaurantId) {
    return pageModel.find({restaurantId:restaurantId});
}


function findAllPagesForUser(userId) {
    return pageModel.find({developerId:userId});
}

function findPageById(id) {
    console.log('I am searching for Page with Id :'+id);
    return pageModel.findById(id);
}

function updatePage(pageId,page) {
    return pageModel.findByIdAndUpdate(pageId,page);
}

function deletePage(pageId){
    return pageModel.findByIdAndRemove(pageId);
}

