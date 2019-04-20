var mongoose = require("mongoose");
var PageSchema = require("./page.schema.server");
var WebsiteModel = require("../restaurant/restaurant.model.server")

var PageModel = mongoose.model('PageModel', PageSchema);

PageModel.createPage = createPage;
PageModel.findAllPagesForWebsite = findAllPagesForWebsite;
PageModel.findPageById = findPageById;
PageModel.updatePage = updatePage;
PageModel.deletePage = deletePage;

module.exports = PageModel;

function createPage(websiteId, page) {
  return PageModel.create(page)
    .then(function(responsePage){
      WebsiteModel.findRestaurantById(responsePage.rid)
        .then(function(website){
          website.pages.push(responsePage);
          return website.save();
        });
      return responsePage;
    });
}

function findAllPagesForWebsite(websiteId) {
  return PageModel.find({'websiteId' : websiteId})
    .populate('rid').exec();
}

function findPageById(pageId) {
  return PageModel.findOne({_id: pageId});
}

function updatePage(pageId, page){
  return PageModel.updateOne({_id: pageId}, page);
}

function deletePage(pageId) {
  PageModel.findPageById(pageId)
    .then(function (page) {
      WebsiteModel.findRestaurantById(page.rid)
        .then(function (website) {
          website.pages.pull({_id : pageId});
          website.save();
        })
    });
  return PageModel.deleteOne({_id: pageId});
}
