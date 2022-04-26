var bodyParser = require('body-parser');
const mongoose = require("mongoose");
var cors = require('cors');
var auth = require("./middleware/auth.js")
const jwt = require('jsonwebtoken');
const passport = require('passport')
const InitiateMongoServer = require("./config/db")
var kafka = require('./kafka/client');
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());


const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    //console.log(file)
    cb(null, Date.now()+'-'+file.originalname)
  }
})


var upload = multer({ storage: storage })
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

const { API_PORT } = process.env;
const port =  API_PORT;

const authenticatectrl = require('./controllers/authenticate-controller.js')
const imgctrl = require("./controllers/image-controller.js")
const profilectrl = require('./controllers/profile-controller.js')
const shopctrl = require('./controllers/shop-controller.js')
const itemctrl = require('./controllers/item-controller.js')

app.post("/register",  function(req, res){

  kafka.make_request('register',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      if (err){
          console.log("Inside err");
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else{
          console.log("Inside else");
              res.json({
                  "resp":results
              });

              res.end();
          }
      
  });
});
app.post("/login",  function(req, res){

  kafka.make_request('login',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      if (err){
          console.log("Inside err");
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else{
          console.log("Inside else");
              res.json({
                  "resp":results
              });

              res.end();
          }
      
  });
});
//app.get("/secret", passport.authenticate('jwt',{session: false}), authenticatectrl.secretuser)
app.post("/uploadprofiledp", function(req, res){

  kafka.make_request('uploadprofiledp',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      if (err){
          console.log("Inside err");
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else{
          console.log("Inside else");
              res.json({
                  "resp":results
              });

              res.end();
          }
      
  });
});
app.post("/updateprofileimgdb", passport.authenticate('jwt',{session: false}), function(req, res){

  kafka.make_request('updateprofileimgdb',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      if (err){
          console.log("Inside err");
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else{
          console.log("Inside else");
              res.json({
                  "resp":results
              });

              res.end();
          }
      
  });
});
app.get("/image", function(req, res){

  kafka.make_request('image',req.params, function(err,results){
      console.log('in result');
      console.log(results);
      if (err){
          console.log("Inside err");
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else{
          console.log("Inside else");
              res.json({
                  "resp":results
              });

              res.end();
          }
      
  });
});
app.post("/updateProfile", passport.authenticate('jwt',{session: false}), function(req, res){

  kafka.make_request('updateProfile',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      if (err){
          console.log("Inside err");
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else{
          console.log("Inside else");
              res.json({
                  "resp":results
              });

              res.end();
          }
      
  });
});
app.post("/checkshopname", passport.authenticate('jwt',{session: false}), function(req, res){

  kafka.make_request('checkshopname',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      if (err){
          console.log("Inside err");
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else{
          console.log("Inside else");
              res.json({
                  "resp":results
              });

              res.end();
          }
      
  });
});
app.post("/createshopdetails", passport.authenticate('jwt',{session: false}),  function(req, res){

  kafka.make_request('createshopdetails',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      if (err){
          console.log("Inside err");
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else{
          console.log("Inside else");
              res.json({
                  "resp":results
              });

              res.end();
          }
      
  });
});
app.post("/displayshopdetails", passport.authenticate('jwt',{session: false}), function(req, res){

  kafka.make_request('displayshopdetails',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      if (err){
          console.log("Inside err");
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else{
          console.log("Inside else");
              res.json({
                  "resp":results
              });

              res.end();
          }
      
  });
});
app.post("/uploadshopdp",upload.single('profile-file'),  function(req, res){

  kafka.make_request('uploadshopdp',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      if (err){
          console.log("Inside err");
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else{
          console.log("Inside else");
              res.json({
                  "resp":results
              });

              res.end();
          }
      
  });
});
app.post("/updateshopimgdb",  function(req, res){

  kafka.make_request('updateshopimgdb',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      if (err){
          console.log("Inside err");
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else{
          console.log("Inside else");
              res.json({
                  "resp":results
              });

              res.end();
          }
      
  });
});
app.post("/additem", function(req, res){

  kafka.make_request('additem',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      if (err){
          console.log("Inside err");
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else{
          console.log("Inside else");
              res.json({
                  "resp":results
              });

              res.end();
          }
      
  });
});
app.post("/uploaditemdp",upload.single('profile-file'),  function(req, res){

  kafka.make_request('uploaditemdp',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      if (err){
          console.log("Inside err");
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else{
          console.log("Inside else");
              res.json({
                  "resp":results
              });

              res.end();
          }
      
  });
});
app.get("/getuniqueItems",  function(req, res){

  kafka.make_request('getuniqueItems',req.params, function(err,results){
      console.log('in result');
      console.log(results);
      if (err){
          console.log("Inside err");
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else{
          console.log("Inside else");
              res.json({
                  "resp":results
              });

              res.end();
          }
      
  });
});
app.post("/editItem",  function(req, res){

  kafka.make_request('editItem',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      if (err){
          console.log("Inside err");
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else{
          console.log("Inside else");
              res.json({
                  "resp":results
              });

              res.end();
          }
      
  });
});
app.get("/displayItems",  function(req, res){

  kafka.make_request('displayItems',req.params, function(err,results){
      console.log('in result');
      console.log(results);
      if (err){
          console.log("Inside err");
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else{
          console.log("Inside else");
              res.json({
                  "resp":results
              });

              res.end();
          }
      
  });
});
app.post("/makeFavorite",passport.authenticate('jwt',{session: false}),  function(req, res){

  kafka.make_request('makeFavorite',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      if (err){
          console.log("Inside err");
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else{
          console.log("Inside else");
              res.json({
                  "resp":results
              });

              res.end();
          }
      
  });
});
app.post("/deleteFavorite", passport.authenticate('jwt',{session: false}), function(req, res){

  kafka.make_request('deleteFavorite',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      if (err){
          console.log("Inside err");
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else{
          console.log("Inside else");
              res.json({
                  "resp":results
              });

              res.end();
          }
      
  });
});
app.get("/getFavorite", passport.authenticate('jwt',{session: false}), function(req, res){

  kafka.make_request('getFavorite',req.params, function(err,results){
      console.log('in result');
      console.log(results);
      if (err){
          console.log("Inside err");
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else{
          console.log("Inside else");
              res.json({
                  "resp":results
              });

              res.end();
          }
      
  });
});
app.post("/searchResults",  function(req, res){

  kafka.make_request('searchResults',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      if (err){
          console.log("Inside err");
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else{
          console.log("Inside else");
              res.json({
                  "resp":results
              });

              res.end();
          }
      
  });
});
app.post("/summaryItem",  function(req, res){

  kafka.make_request('summaryItem',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      if (err){
          console.log("Inside err");
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else{
          console.log("Inside else");
              res.json({
                  "resp":results
              });

              res.end();
          }
      
  });
});
app.post("/addCart",passport.authenticate('jwt',{session: false}), function(req, res){

  kafka.make_request('addCart',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      if (err){
          console.log("Inside err");
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else{
          console.log("Inside else");
              res.json({
                  "resp":results
              });

              res.end();
          }
      
  });
});
app.get("/fetchCart",passport.authenticate('jwt',{session: false}), function(req, res){

  kafka.make_request('fetchCart',req.params, function(err,results){
      console.log('in result');
      console.log(results);
      if (err){
          console.log("Inside err");
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else{
          console.log("Inside else");
              res.json({
                  "resp":results
              });

              res.end();
          }
      
  });
});
app.post("/deleteCart",passport.authenticate('jwt',{session: false}), function(req, res){

  kafka.make_request('deleteCart',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      if (err){
          console.log("Inside err");
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else{
          console.log("Inside else");
              res.json({
                  "resp":results
              });

              res.end();
          }
      
  });
});
app.post("/saveCart",passport.authenticate('jwt',{session: false}), function(req, res){

  kafka.make_request('saveCart',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      if (err){
          console.log("Inside err");
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else{
          console.log("Inside else");
              res.json({
                  "resp":results
              });

              res.end();
          }
      
  });
});
app.post("/saveDesc",passport.authenticate('jwt',{session: false}), function(req, res){

  kafka.make_request('saveDesc',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      if (err){
          console.log("Inside err");
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else{
          console.log("Inside else");
              res.json({
                  "resp":results
              });

              res.end();
          }
      
  });
});
app.post("/proceedCheckout",passport.authenticate('jwt',{session: false}), function(req, res){

  kafka.make_request('proceedCheckout',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      if (err){
          console.log("Inside err");
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else{
          console.log("Inside else");
              res.json({
                  "resp":results
              });

              res.end();
          }
      
  });
});
app.post("/mypurchases", passport.authenticate('jwt',{session: false}), function(req, res){

  kafka.make_request('mypurchases',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      if (err){
          console.log("Inside err");
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else{
          console.log("Inside else");
              res.json({
                  "resp":results
              });

              res.end();
          }
      
  });
});
//server listening 
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

module.exports = app