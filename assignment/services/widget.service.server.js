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
  app.post("/api/page/:pageId/widget", createWidget);
  //app.post ("/api/upload", upload.single('myFile'), uploadImage);
  //Get calls
  app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
  app.get("/api/widget/:widgetId", findWidgetById);
  //Put calls
  app.put("/api/widget/:widgetId", updateWidget);
  //app.put("/page/:pageId/widget", reSortWidget);
  //delete calls
  app.delete("/api/widget/:widgetId", deleteWidget);
  //Reorder
  app.put("/api/page/:pageId/widget",reorderWidgets);

  //UPLOAD
  app.post ("/api/upload", upload, uploadImage);
  //app.post ("/api/upload", upload.single('myFile'), uploadImage);
  //app.post ("/api/upload", multer(multerConf).single('myFile'), uploadImage);
  var widgets = [
    {_id: '123', widgetType: 'HEADING', pageId: '321',size:  '2', text:'GOP Releases Formerly Classified Memo Critical Of FBI' },
    {_id: '234', widgetType: 'HEADING', pageId: '321',size: '4', text: 'It hints at a new GOP target: deputy attorney general' },
    {_id: '345', widgetType: 'IMAGE', pageId: '321',size:  '2',text: 'text', width:'100%',
      url: 'https://media.fox5dc.com/media.fox5dc.com/photo/2018/02/01/trump_classified_1517500733623_4880181_ver1.0_640_360.jpg'},
    {_id: '567', widgetType: 'HEADING', pageId: '321', size: '4', text: 'Memo asserts bias on part of FBI investigation in Russia probe'},
    {_id: '678', widgetType: 'YOUTUBE', pageId: '321', size: '2',text:  'text', width: '100%', url: 'https://www.youtube.com/embed/I84wnvEqGXc'},
  ];

  function createWidget(req, res) {
    var pageId = req.params['pageId'];
    var widget = req.body;
    widget.pageId = pageId;
    console.log("widget passed to db: " + widget);
    WidgetModel.createWidget(pageId,widget).then( function (widget) {
      res.json(widget);
    });
    // widget._id = (new Date()).getTime() + "";
    // widget.pageId = pageId;
    // widgets.push(widget);
    // console.log('add new widget' + widget);
    // res.json(widget);
  }

  function findAllWidgetsForPage(req, res) {
    var pageId = req.params['pageId'];
    WidgetModel.findAllWidgetsForPage(pageId).then( function (widget) {
      res.json(widget);
    });
    // var widgets_list = [];
    // for (var i = 0; i < widgets.length; i++) {
    //   if (widgets[i].pageId === pageId) {
    //     widgets_list.push(widgets[i]);
    //   }
    // }
    // res.json(widgets_list);
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
    // var found_widget = null;
    // for (var i = 0; i < widgets.length; i++) {
    //   if (widgets[i]._id === widgetId) {
    //     found_widget = widgets[i];
    //     console.log(found_widget);
    //   }
    // }
    // if (found_widget) {
    //   res.status(200).send(found_widget);
    // } else {
    //   res.status(404).send('findWidgetById Not Found');
    // }
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
    // if (!widget) {
    //   res.status(404).send('Update error');
    // }
    // for (var i = 0; i < widgets.length; i++) {
    //   if (widgets[i]._id === widgetId) {
    //     widgets[i] = widget;
    //   }
    // }
    //
    // res.json(widget);
  }

  function deleteWidget(req, res) {
    var widgetId = req.params['widgetId'];
    WidgetModel.deleteWidget(widgetId).then(() => (
      res.sendStatus(200)));
    // for (var i = 0; i < widgets.length; i++) {
    //   if (widgets[i]._id === widgetId) {
    //     widgets.splice(i, 1);
    //   }
    // }
    // res.json(widgets);
  }

  function reorderWidgets(req,res) {
    var pageId = req.params.pageId;
    var startIndex = parseInt(req.query["start"]);
    var endIndex = parseInt(req.query["end"]);
    console.log("pageId: " + pageId);
    console.log("start" + startIndex);
    console.log("end: " + endIndex);
    WidgetModel.reorderWidget(pageId, startIndex, endIndex)
      .then(
        function (page) {
          res.status(200);
        },
        function (error) {
          res.status(400).send(error);
        })
    // var startIndex = parseInt(req.query["start"]);
    // var endIndex = parseInt(req.query["end"]);

    //array_swap(widgets, startIndex, endIndex);
    //res.send(200);
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
    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;


    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;
    console.log('widgetId: ' + widgetId);
    console.log('myFile: ' + myFile);

    if(myFile == null) {
      //res.redirect("https://yourheroku.herokuapp.com/user/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
      //res.redirect("http://localhost:8080/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
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
      var widget = {_id: undefined, widgetType: 'IMAGE', pageId: pageId,size: size,text: 'text', width:'100%',
        url:'/uploads/'+filename};
      WidgetModel.createWidget(pageId, widget)
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
    const callbackUrl   = "/#/user/website/" + websiteId + "/page/" + pageId+ "/widget";
    res.redirect(callbackUrl);
  }

};
