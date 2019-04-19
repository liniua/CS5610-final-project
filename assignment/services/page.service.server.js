module.exports=function(app) {

  var PageModel = require("../model/page/page.model.server");

  //POST calls
  app.post("/api/website/:websiteId/page", createPage);
  //Get calls
  app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
  app.get("/api/page/:pageId", findPageById);
  //Put calls
  app.put("/api/page/:pageId", updatePage);
  //Delete calls
  app.delete("/api/page/:pageId", deletePage);

  var pages = [
      {_id: '321', name: 'Post 1', websiteId: '333', title: 'Lorem'},
      {_id: '4', name: 'Post 2', websiteId: '333', title: 'Lorem'},
      {_id: '5', name: 'Post 3', websiteId: '333', title: 'Lorem'},
      {_id: '1', name: 'Post 4', websiteId: '3', title: 'Lorem'},
      {_id: '2', name: 'Post 5', websiteId: '2', title: 'Lorem'}
      ];

  function createPage(req, res) {
    var websiteId = req.params['websiteId'];
    var createdPage = req.body;
    createdPage.websiteId = websiteId;
    PageModel.createPage(websiteId, createdPage).then((page) => (res.json(page)));
    // createdPage._id = (new Date()).getDate() + "";
    // createdPage.websiteId = websiteId;
    // pages.push(createdPage);
    //
    // res.json(pages);
  }

  function findAllPagesForWebsite(req, res) {
    var websiteId = req.params["websiteId"];
    PageModel.findAllPagesForWebsite(websiteId).then((pages) => (res.json(pages)));
    // var pages_res = [];
    // for (var i = 0; i < pages.length; i++) {
    //   if (pages[i].websiteId === websiteId) {
    //     pages_res.push(pages[i]);
    //   }
    // }
    // res.json(pages_res);
  }

  function findPageById(req, res){
    var pageId = req.params["pageId"];
    PageModel.findPageById(pageId).then(function (foundPage) {
      if (foundPage){
        res.json(foundPage);
      } else {
        res.status(401);
        res.json(foundPage);
      }
    });
    // var foundPage = null;
    // for (var i = 0; i < pages.length; i++) {
    //   if (pages[i]._id === pageId) {
    //     foundPage = pages[i];
    //   }
    // }
    // if (foundPage){
    //   res.json(foundPage);
    // } else {
    //   res.status(401);
    //   res.json(foundPage);
    // }
  }

  function updatePage(req, res) {
    var pageId = req.params["pageId"];
    var page = req.body;
    PageModel.updatePage(pageId, page).then((page) => (res.json(page)));
    // for (var i = 0; i < pages.length; i++) {
    //   if (pages[i]._id === pageId) {
    //     pages[i].name = page.name;
    //     pages[i].title = page.title;
    //   }
    // }
    // res.json(pages);
  }

  function deletePage(req, res) {
    var pageId = req.params["pageId"];
    PageModel.deletePage(pageId).then(() => (
      res.status(200)));
    res.send("success");
    // for (var i = 0; i < pages.length; i++) {
    //   if (pages[i]._id === pageId) {
    //     pages.splice(i, 1);
    //   }
    // }
    // res.json(pages);
  }
};
