var mongoose = require('mongoose');
var restaurantSchema = require('./restaurant.schema.server');

var restaurantModel = mongoose.model("Restaurant",restaurantSchema);
var userModel = require('../user/user.model.server');

restaurantModel.createRestaurantForUser = createRestaurantForUser;
restaurantModel.findAllRestaurantsForUser = findAllRestaurantsForUser;
restaurantModel.findRestaurantById= findRestaurantById;
restaurantModel.updateRestaurant = updateRestaurant;
restaurantModel.deleteRestaurant = deleteRestaurant;

module.exports = restaurantModel;


/*function createUser(user) {
  return userModel.create(user, function (err, userSchema) {
    if(err){return handleError(err);}
  });
}*/
function createRestaurantForUser(userId, restaurant) {
    console.log("model: "+restaurant);
    return restaurantModel.create(restaurant).then(
        function(newRestaurant){
            userModel.findUserById(userId).then(
                function(user){
                    user.pages.push(newRestaurant);
                    userModel.updateUser(userId,user);
                }
            );
            return newRestaurant;
        }
    );
}

function findAllRestaurantsForUser(userId) {
    return restaurantModel.find({ownerId: userId});
}

function findRestaurantById(id) {
    console.log('I am searching for restaurant with Id :'+id);
    return restaurantModel.findById(id);
}

function updateRestaurant(restaurantId, restaurant) {
    return restaurantModel.findByIdAndUpdate(restaurantId,restaurant);
}

function deleteRestaurant(restaurantId){
    return restaurantModel.findByIdAndRemove(restaurantId);
}
