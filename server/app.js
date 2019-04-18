module.exports= function(app){
    // app.get("/api/hello/js", newhello);
    // function newhello(req,res){
    //   console.log("hello from root context handler");
    //   res.send({message: "Hello from handler in jason 123"});
    // }

    require('./services/UserServiceServer')(app);
    require('./services/PageServiceServer')(app);
    require('./services/RestaurantServiceServer')(app);
    require('./services/WidgetServiceServer')(app);
}
