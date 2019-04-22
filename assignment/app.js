module.exports=function(app) {
  require('./services/user.service.server')(app);
  require('./services/restaurant.service.server')(app);
  require('./services/page.service.server')(app);
  require('./services/widget.service.server')(app);
  require('./services/yelp.service')(app);
}
