

module.exports=function(app) {

  var websites = [
  {_id: "321", name: "Facebook", developerId: "123"},
  {_id: "432", name: "Twitter", developerId: "234"},
  {_id: "234", name: "Amazon", developerId: "345"},
  {_id: "333", name: "MyWebSite", developerId: "123"}
];

  var WebsiteModel = require("../model/website/website.model.server");

  // post
  app.post("/api/user/:userId/website", createWebsite);

  // GET
  app.get("/api/user/:userId/website", findAllWebsitesForUser);
  app.get("/api/user/:userId/website/:websiteId", findWebsiteById);

  //DELETE
  app.delete("/api/user/:userId/website/:websiteId", deleteWebsite);

  //PUT
  app.put("/api/user/:userId/website/:websiteId", updateWebsite);

  function createWebsite(req, res){
    var userId = req.params['userId'];
    var website = req.body;
    website.developId = userId;
    WebsiteModel.createWebsiteForUser(userId, website)
      .then(function(result){
        console.log("create website:  " + result);
        res.send(result);
      });
    // website._id = Math.random().toString();

    // websites.push(website);
    // console.log('create new website: ' + website);
    // res.json(website);

  }

  function getWebsitesForUserId(userId) {
    var websites_res=[];

    for(var i = 0; i < websites.length; i++) {
      if (websites[i].developerId === userId) {
        websites_res.push(websites[i]);
      }
    }
    return websites_res;
  }

  function findAllWebsitesForUser(req, res) {
    var userId = req.params['userId'];
    WebsiteModel.findWebsitesForUser(userId).then(
      function (websites) {
        console.log(websites);
        res.json(websites);
      },
      function (err) {
        res.status(400).send(err);
      });
    // var websites_temp = getWebsitesForUserId(userId);
    // res.json(websites_temp);
  }

  function findWebsiteById(req, res){
    var userId = req.params['userId'];
    var websiteId = req.params['websiteId'];
    WebsiteModel.findWebisteById(websiteId).then((website) => res.json(website));
    // var website = null;
    // for(var i = 0; i < websites.length; i++) {
    //   if (websites[i]._id === websiteId && websites[i].developerId === userId) {
    //     website = websites[i];
    //   }
    // }
    // console.log('find a website: ');
    // res.json(website);
  }

  function updateWebsite(req, res){
    var userId = req.params['userId'];
    var websiteId = req.params['websiteId'];
    var newWebSite = req.body;
    WebsiteModel.updateWebsite(websiteId,newWebSite).then(function(website) {
      if(website) {
        res.status(200).send(website);
      } else {
        res.status(404).send('Not find!');
      }
    });
    // for(var i = 0; i < websites.length; i++) {
    //   if (websites[i]._id === websiteId) {
    //     websites[i].name = newWebSite.name;
    //     websites[i].developerId = newWebSite.developerId;
    //     websites[i].description = newWebSite.description;
    //     break;
    //   }
    // }
    // res.json(getWebsitesForUserId(userId));
  }

  function deleteWebsite(req, res) {
    var userId = req.params['userId'];
    var websiteId = req.params['websiteId'];
    WebsiteModel.deleteWebsite(websiteId).then(() => (
      res.status(200)));
    res.send("success");
    // for (var i = 0; i < websites.length; i++) {
    //   if (websites[i]._id === websiteId) {
    //     websites.splice(i, 1);
    //     var websites_temp = getWebsitesForUserId(userId);
    //     console.log('Delete success');
    //     res.json(websites_temp);
    //     return;
    //   }
    // }
  }
};
