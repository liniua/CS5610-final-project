

module.exports=function(app) {

  var RestaurantModel = require("../model/restaurant/restaurant.model.server");

  // post
  app.post("/api/user/:userId/restaurant", createRestaurant);

  // GET
  app.get("/api/user/:userId/restaurant", findAllRestaurantsForUser);
  app.get("/api/user/:userId/restaurant/:restId", findRestaurantById);

  //DELETE
  app.delete("/api/user/:userId/restaurant/:restId", deleteRestaurant);

  //PUT
  app.put("/api/user/:userId/restaurant/:restId", updateRestaurant);

  function createRestaurant(req, res){
    var userId = req.params['userId'];
    var restaurant = req.body;
    restaurant.ownerId = userId;
    RestaurantModel.createRestaurantForUser(userId, restaurant)
      .then(function(result){
        console.log("create restaurant:  " + result);
        res.send(result);
      });
  }


  function findAllRestaurantsForUser(req, res) {
    var userId = req.params['userId'];
    RestaurantModel.findRestaurantsForUser(userId).then(
      function (restaurants) {
        console.log(restaurants);
        res.json(restaurants);
      },
      function (err) {
        res.status(400).send(err);
      });

  }

  function findRestaurantById(req, res){
    var userId = req.params['userId'];
    var restId = req.params['restId'];
    RestaurantModel.findRestaurantById(restId).then((restaurant) => res.json(restaurant));
  }

  function updateRestaurant(req, res){
    var userId = req.params['userId'];
    var restId = req.params['restId'];
    var newRestaurant = req.body;
    RestaurantModel.updateRestaurant(restId,newRestaurant).then(function(restaurant) {
      if(restaurant) {
        res.status(200).send(restaurant);
      } else {
        res.status(404).send('Not find!');
      }
    });
  }

  function deleteRestaurant(req, res) {
    var userId = req.params['userId'];
    var restId = req.params['restId'];
    RestaurantModel.deleteRestaurant(restId).then(() => (
      res.status(200)));
    res.send("success");
  }
};
