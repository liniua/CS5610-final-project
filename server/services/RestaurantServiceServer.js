module.exports= function(app){
    var restaurantModel = require('../model/restaurant/restaurant.model.server');

    //app.get("/api/hello/website", newhello);
    app.post("/api/user/:userId/restaurant", createRestaurant);
    app.get("/api/user/:userId/restaurant", findAllRestaurantsForUser);
    app.get("/api/restaurant/:restaurantId", findRestaurantById);
    app.put("/api/restaurant/:restaurantId", updateRestaurant);
    app.delete("/api/restaurant/:restaurantId", deleteRestaurant);

    function createRestaurant(req, res){
        var userId = req.params['userId'];
        var restaurant = req.body;
        restaurantModel.createRestaurantForUser(userId, restaurant).then(
            function(restaurant){
                res.json(restaurant);
            },
            function(error){
                res.status(400).send("Error of create restaurant:"+error);
            }
        );
    }
    // function getAllWebsitesForUser(userId){
    //   var webs=[];
    //   for(var i = 0; i < websites.length; i++) {
    //     if (websites[i].developerId === userId) {
    //       webs.push(websites[i]);
    //     }
    //   }
    //   return webs;
    // }
    function findAllRestaurantsForUser(req, res){
        var userId = req.params['userId'];
        restaurantModel.findAllRestaurantsForUser(userId)
            .then(
                function (restaurants) {
                    res.json(restaurants);
                },
                function (err) {
                    res.statusCode(400).send(err);
                }
            );
    }


    function findRestaurantById(req,res){
        var reId = req.params.restaurantId;
        console.log('I am in the right place to find a restaurant');
        restaurantModel.findRestaurantById(reId)
            .then(
                function(restaurant){
                    console.log('send restaurant:' + restaurant);
                    res.send(restaurant);
                },
                function (err) {
                    res.statusCode(400).send(err);
                }
            )
    }

    function updateRestaurant(req, res){
        var reId = req.params['restaurantId'];
        var newRestaurant = req.body;
       restaurantModel.updateRestaurant(reId,newRestaurant)
            .then(
                function (restaurant) {
                    res.send(restaurant);
                },
                function (err) {
                    res.statusCode(400).send(err);
                }
            );
    }

    function deleteRestaurant(req, res){
        console.log("I am in delete restaurant");
        var reId = req.params['restaurantId'];
        console.log('restaurantId to be deleted:' + reId);
        restaurantModel.deleteRestaurant(reId)
            .then(
                function (data) {
                    res.json(data);
                },
                function (err) {
                    res.statusCode(400).send(err);
                }
            );
    }
}
