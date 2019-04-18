module.exports= function(app){
    var pageModel = require('../model/page/page.model.server');

    //app.get("/api/hello/website", newhello);
    app.post("/api/restaurant/:restaurantId/page", createPage);
    app.get("/api/user/:userId/page", findAllPagesForUser);
    app.get("/api/restaurant/:restaurantId/page", findAllPagesForRestaurant);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req, res){
        var restaurantId = req.params['restaurantId'];
        var page = req.body;
        pageModel.createPageForRestaurant(restaurantId, page).then(
            function(page){
                res.json(page);
            },
            function(error){
                res.status(400).send("Error of create page:"+error);
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
    function findAllPagesForUser(req, res){
        var userId = req.params['userId'];
        pageModel.findAllPagesForUser(userId)
            .then(
                function (pages) {
                    res.json(pages);
                },
                function (err) {
                    res.statusCode(400).send(err);
                }
            );
    }
    function findAllPagesForRestaurant(req, res){
        var restaurantId = req.params['restaurantId'];
        pageModel.findAllPagesForRestaurant(restaurantId)
            .then(
                function (pages) {
                    res.json(pages);
                },
                function (err) {
                    res.statusCode(400).send(err);
                }
            );
    }

    function findPageById(req,res){
        var pageId = req.params.pageId;
        console.log('I am in the right place to find a page');
        pageModel.findPageById(pageId)
            .then(
                function(page){
                    console.log('send page:' + page);
                    res.send(page);
                },
                function (err) {
                    res.statusCode(400).send(err);
                }
            )
    }

    function updatePage(req, res){
        var pageId = req.params['pageId'];
        var newPage = req.body;
        pageModel.updatePage(pageId,newPage)
            .then(
                function (page) {
                    res.send(page);
                },
                function (err) {
                    res.statusCode(400).send(err);
                }
            );
    }

    function deletePage(req, res){
        console.log("I am in delete page");
        var pageId = req.params['pageId'];
        console.log('pageId to be deleted:' + pageId);
        pageModel.deletePage(pageId)
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
