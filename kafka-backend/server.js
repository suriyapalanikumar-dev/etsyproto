var bodyParser = require('body-parser');
const mongoose = require("mongoose");
var cors = require('cors');
var auth = require("./middleware/auth.js")
const jwt = require('jsonwebtoken');
const passport = require('passport')
const InitiateMongoServer = require("./config/db")
InitiateMongoServer()
require('./config/passport')
var connection =  new require('./kafka/Connection');
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

var registeruser = require("./controllers/authenticate-controller")
var loginuser = require("./controllers/authenticate-controller")
var uploadpic = require("./controllers/image-controller.js")
var updateprofileimage = require("./controllers/profile-controller.js")
var retrieveImg = require("./controllers/image-controller.js")
var updateUserdetails = require("./controllers/authenticate-controller.js")
var isshopnameavailabile = require("./controllers/authenticate-controller.js")
var createshopname = require('./controllers/shop-controller.js')
var getshopdetails = require('./controllers/shop-controller.js')
var uploadpic = require('./controllers/shop-controller.js')
var updateshopimage = require('./controllers/shop-controller.js')
var enrollItem = require("./controllers/item-controller.js")
var uploadpic = require("./controllers/image-controller.js")
var fetchItem = require("./controllers/item-controller.js")
var updateItem = require("./controllers/item-controller.js")
var getallItems = require("./controllers/item-controller.js")
var setFavorite = require("./controllers/item-controller.js")
var removeFavorite = require("./controllers/item-controller.js")
var fetchFavorite = require("./controllers/item-controller.js")
var fetchSearch = require("./controllers/item-controller.js")
var summaryItem = require("./controllers/item-controller.js")
var addToCart = require("./controllers/item-controller.js")
var getallCart = require("./controllers/item-controller.js")
var deleteCart= require("./controllers/item-controller.js")
var saveCart = require("./controllers/item-controller.js")
var saveDesc = require("./controllers/item-controller.js")
var checkout = require("./controllers/item-controller.js")
var purchaseitems = require("./controllers/item-controller.js")





var upload = multer({ storage: storage })
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
    console.log('message received for ' + topic_name +" ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("/register", registeruser)
handleTopicRequest("/login",loginuser)
//handleTopicRequest("/secret",  secretuser)
handleTopicRequest("/uploadprofiledp",uploadpic)
handleTopicRequest("/updateprofileimgdb", updateprofileimage)
handleTopicRequest("/image/:key",retrieveImg)
handleTopicRequest("/updateProfile", updateUserdetails)
handleTopicRequest("/checkshopname", isshopnameavailabile)
handleTopicRequest("/createshopdetails", createshopname)
handleTopicRequest("/displayshopdetails", getshopdetails)
handleTopicRequest("/uploadshopdp",uploadpic)
handleTopicRequest("/updateshopimgdb", updateshopimage)
handleTopicRequest("/additem",enrollItem)
handleTopicRequest("/uploaditemdp",uploadpic)
handleTopicRequest("/getuniqueItems/:shopname", fetchItem)
handleTopicRequest("/editItem", updateItem)
handleTopicRequest("/displayItems", getallItems)
handleTopicRequest("/makeFavorite",setFavorite)
handleTopicRequest("/deleteFavorite", removeFavorite)
handleTopicRequest("/getFavorite", fetchFavorite)
handleTopicRequest("/searchResults", fetchSearch)
handleTopicRequest("/summaryItem", summaryItem)
handleTopicRequest("/addCart",addToCart)
handleTopicRequest("/fetchCart",getallCart)
handleTopicRequest("/deleteCart",deleteCart)
handleTopicRequest("/saveCart",saveCart)
handleTopicRequest("/saveDesc",saveDesc)
handleTopicRequest("/proceedCheckout",checkout)
handleTopicRequest("/mypurchases", purchaseitems)

