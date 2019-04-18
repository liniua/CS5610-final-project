module.exports= function(app){
    app.get("/api/hello/widget", newhello);
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidgets);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.put("/api/page/:pageId/widget", changeOrderOfWidgets);
    app.post("/api/widget/:widgetId",uploadImage);

    var widgetModel = require('../model/widget/widget.model.server');
    var multer = require('multe
    var storage = multer.diskStorage({destination: __dirname+'/../../dist/web-maker/assets/uploads/',
            filename: function (req, file, cb) {
                cb(null, file.originalname);
            }
        }
    );
    var upload = multer({storage: storage}).single('myFile');

    function newhello(req,res){
        console.log("hello from root context handler");
        res.send({message: "Hello from handler in WidgetServer"});
    }

    function createWidget (req, res) {
        var pageId = req.params['pageId'];
        var widget = req.body;
        return widgetModel.createWidget(pageId,widget).then(
            function(widget){
                res.send(widget);
            },
            function(error){
                res.send(error);
            }
        );
    }


    function findAllWidgetsForPage (req, res) {
        var pageId = req.params['pageId'];
        return widgetModel.findAllWidgetsForPage(pageId).then(
            function(pages){
                res.send(pages);
            },
            function(error){
                res.send(error);
            }
        );
    }

    function findWidgetById (req, res) {
        var widId = req.params['widgetId'];
        return widgetModel.findWidgetById(widId).then(
            function(widget){
                res.send(widget);
            },
            function(error){
                res.send(error);
            }
        )
    }

    function updateWidgets(req, res){
        var widId = req.params['widgetId'];
        var widget = req.body;
        console
        widgetModel.updateWidget(widId,widget).then(
            function(widget){
                res.send(widget);
            },
            function(error){
                res.send(error);
            }
        );

    }

    function deleteWidget(req, res) {
        console.log("I am deleting widget");
        var widId = req.params['widgetId'];
        widgetModel.deleteWidget(widId).then(
            function(widget){
                res.send(widget);
            },
            function(error){
                res.send(error);
            }
        );
    }

    function uploadImage(req, res){
        upload(req,res,(err) => {
            if(err){
            }else{
                if(req.file === undefined){
                }else {
                    var curwidget = req.body;
                    var widgetId = req.body['widgetId'];
                    console.log('I am uploading file');
                    console.log('widgetId is :' + widgetId);
                    var myFile = req.file;
                    console.log(req.body);
                    var userId = req.body.userId;
                    var websiteId = req.body.websiteId;
                    var pageid = req.body.pageId;
                    var originalname = myFile.originalname; // file name on user's computer
                    var filename = myFile.filename; // new file name in upload folder
                    console.log('filename: '+filename)
                    var path = myFile.path; // full path of uploaded file
                    var destination = myFile.destination; // folder where file is saved to
                    var mysize = myFile.size;
                    var mimetype = myFile.mimetype;
                    var myurl = '/assets/uploads/'+filename;
                    var newWidget = {url: myurl, size: mysize};

                    widgetModel.updateWidget(widgetId, newWidget).then(
                        function(widget){
                            res.send(widget);
                        },
                        function(error) {
                            res.status(400).send(error);
                        }
                    );

                }
            }
        });
        //res.send("test");
    }

    function changeOrderOfWidgets(req, res){
        console.log("I am changing the order of items");

        var startIndex = parseInt(req.query["start"]);
        var endIndex = parseInt(req.query["end"]);
        var pageId = req.params['pageId'];
        widgetModel.reorderWidget(pageId,startIndex,endIndex).then(
            function (widgets){
                res.send(widgets);
            },
            function(error) {
                res.send(error);
            }
        );
        // array_swap(widgets, startIndex, endIndex);
        // res.json(widgets);
    }
    // function array_swap(arr, old_index, new_index) {
    //   while (old_index < 0) {
    //     old_index += arr.length;
    //   }
    //   while (new_index < 0) {
    //     new_index += arr.length;
    //   }
    //   if (new_index >= arr.length) {
    //     var k = new_index - arr.length + 1;
    //     while (k--) {
    //       arr.push(undefined);
    //     }
    //   }
    //   arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    // };

}

