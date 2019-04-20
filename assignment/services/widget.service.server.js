module.exports=function(app) {

  var multer = require('multer'); // npm install multer --save
  //var upload = multer({ dest: __dirname+'/../../src/assets/uploads' });
  var WidgetModel = require('../model/widget/widget.model.server');
  // var multerConf = {
  //   storage: multer.diskStorage({
  //     destination: __dirname + '/../../dist/my-project/assets/uploads/',
  //     filename: function (req, file, cb) {
  //       console.log(file);
  //       cb(null, file.originalname);
  //     }
  //   }),
  // };
  var storage = multer.diskStorage({destination: __dirname+'/../../dist/my-project/assets/uploads/',
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      }
    }

  );

  var upload = multer({storage: storage}).single('myFile');

  //POST calls
  app.post("/api/restaurant/:rid/widget", createWidget);

  //Get calls
  app.get("/api/restaurant/:rid/widget", findAllWidgetsForRest);
  app.get("/api/widget/:widgetId", findWidgetById);
  //Put calls
  app.put("/api/widget/:widgetId", updateWidget);

  //delete calls
  app.delete("/api/widget/:widgetId", deleteWidget);
  //Reorder
  app.put("/api/restaurant/:rid/widget",reorderWidgets);

  //UPLOAD
  app.post ("/api/upload", upload, uploadImage);
  //app.post ("/api/upload", upload.single('myFile'), uploadImage);
  //app.post ("/api/upload", multer(multerConf).single('myFile'), uploadImage);

  function createWidget(req, res) {
    var rid = req.params['rid'];
    var widget = req.body;
    widget.rid = rid;
    console.log("widget passed to db: " + widget);
    WidgetModel.createWidget(rid,widget).then( function (widget) {
      res.json(widget);
    });
    // widget._id = (new Date()).getTime() + "";
    // widget.rid = rid;
    // widgets.push(widget);
    // console.log('add new widget' + widget);
    // res.json(widget);
  }

  function findAllWidgetsForRest(req, res) {
    var rid = req.params['rid'];
    WidgetModel.findAllWidgetsForRest(rid).then( function (widget) {
      res.json(widget);
    });
  }

  function findWidgetById(req, res) {
    var widgetId = req.params["widgetId"];
    WidgetModel.findWidgetById(widgetId).then(function (widget) {
      if (widget) {
        res.status(200).send(widget);
      } else {
        res.status(404).send('findWidgetById Not Found');
      }
    });
  }

  function updateWidget(req, res) {
    var widgetId = req.params['widgetId'];
    var widget = req.body;
    WidgetModel.updateWidget(widgetId, widget).then(function (widget) {
        if (widget) {
          res.status(200).send(widget);
        } else {
          res.status(404).send('Update error');
        }
      });
  }

  function deleteWidget(req, res) {
    var widgetId = req.params['widgetId'];
    WidgetModel.deleteWidget(widgetId).then(() => (
      res.sendStatus(200)));
  }

  function reorderWidgets(req,res) {
    var rid = req.params.rid;
    var startIndex = parseInt(req.query["start"]);
    var endIndex = parseInt(req.query["end"]);
    console.log("rid: " + rid);
    console.log("start" + startIndex);
    console.log("end: " + endIndex);
    WidgetModel.reorderWidget(rid, startIndex, endIndex)
      .then(
        function (page) {
          res.status(200);
        },
        function (error) {
          res.status(400).send(error);
        })
  }

  function array_swap(arr, old_index, new_index) {
    while (old_index < 0) {
      old_index += arr.length;
    }
    while (new_index < 0) {
      new_index += arr.length;
    }
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  }




  function uploadImage(req, res) {
    var rid = req.body.rid;


    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;
    console.log('widgetId: ' + widgetId);
    console.log('myFile: ' + myFile);

    if(myFile == null) {
      //res.redirect("https://yourheroku.herokuapp.com/user/website/"+rid+"/restaurant-page/"+rid+"/widget/"+widgetId);
      //res.redirect("http://localhost:8080/user/"+userId+"/restaurant/"+rid+"/restaurant-page/"+rid+"/widget/"+widgetId);
      return;
    }


    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;


    // find widget by id
    if (widgetId === undefined) {
      var widget = {_id: undefined, widgetType: 'IMAGE', rid: rid,size: size,text: 'text', width:'100%',
        url:'/uploads/'+filename};
      WidgetModel.createWidget(rid, widget)
    } else {
      var widget = { url: '/assets/uploads/'+filename };
      WidgetModel
        .updateWidget(widgetId, widget)
        .then(function (status) {
            res.sendStatus(200);
          },
          function (err) {
            res.sendStatus(404).send(err);
          })
      ;
    }

    //res.send("Upload successfully!");
    const callbackUrl   = "/#/userpage/" + rid+ "/widget";
    res.redirect(callbackUrl);
  }

};
