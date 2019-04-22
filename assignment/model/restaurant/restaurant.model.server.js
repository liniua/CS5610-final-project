var mongoose = require("mongoose");
var RestaurantSchema = require("./restaurant.schema.server");
var RestaurantModel = mongoose.model('RestaurantModel', RestaurantSchema);

var UserModel = require("../user/user.model.server");

RestaurantModel.findRestaurantsForUser = findRestaurantsForUser;
RestaurantModel.createRestaurantForUser = createRestaurantForUser;
RestaurantModel.findRestaurantById = findRestaurantById;
RestaurantModel.updateRestaurant = updateRestaurant;
RestaurantModel.deleteRestaurant = deleteRestaurant;
RestaurantModel.findRestaurantByName = findRestaurantByName;
RestaurantModel.findRestaurantsByZipcode = findRestaurantsByZipcode;


module.exports = RestaurantModel;

function findRestaurantsForUser(userId){
  return RestaurantModel.find({"ownerId": userId})
    .populate('ownerId', 'username')
    .exec();
}

function findRestaurantsByZipcode(zipcode) {
    return RestaurantModel.find({zipcode: zipcode});
}

function findRestaurantByName(restName) {
    return RestaurantModel.findOne({name: restName});
}

function createRestaurantForUser(userId, restaurant){
  console.log("this is from userId " + userId);
  return RestaurantModel.create(restaurant)
    .then(function(responseRestaurant){
      UserModel.findUserById(restaurant.ownerId)
        .then(function(user){
          user.restaurants.push(responseRestaurant);
          return user.save();
        });
      return responseRestaurant;
    });
}

function findRestaurantById(restId) {
  return RestaurantModel.findOne({_id: restId});
}

function updateRestaurant(restId, restaurant) {
  return RestaurantModel.updateOne({_id: restId},restaurant);
}

function deleteRestaurant(restId) {
  RestaurantModel.findRestaurantById(restId).then(function(restaurant) {
    UserModel.findUserById(restaurant.ownerId).then(function(user){
      user.restaurants.pull({_id: restId});
      user.save();
    })
  });
  return RestaurantModel.deleteOne({_id: restId});
}
