const connection = require("../config/db")
const jwt = require("jsonwebtoken");
const Shop = require("../model/shop");

module.exports.isshopnameavailabile = async(req, res) =>{
    const {shopname} = req.body
    var authorization = req.headers.authorization.split(' ')[1],
    decoded;
    decoded = jwt.verify(authorization, 'TOP_SECRET');
    let foundShop = await Shop.findOne({"shopname": shopname });
    if(!foundShop)
    {
      res.status(200).json({
        data: "Available",
        message: 'Shop Name'
      })
    }
    else{
      res.status(500).json({
        data: "Not Available",
      })
    }
}

module.exports.createshopname = (req, res) =>{
    const {shopname} = req.body
    var authorization = req.headers.authorization.split(' ')[1],
    decoded;
    decoded = jwt.verify(authorization, 'TOP_SECRET');
    let newShop = new Shop({"shopname":shopname, "ownerID":decoded.sub})
    newShop.save()
    if(newShop)
    {
      res.status(200).json({
        data: "Shop Name Created"
      })
    }
    else{
      res.status(500).json({
        data: "Shop cannot be created"
      })
    }
}

module.exports.updateshopimage = (req, res) =>{
  const {imgname,shopname, userid} = req.body
    const sql = `update dbetsy.Shop set simgname=? where shopname=? and ownerid=?`
    const values = [
        imgname,
        shopname, 
        userid
    ]
    connection.query(sql, values, function (error, results, fields) {
        if (error) {
          console.log(error);
          res.status(500).json({
            message: error.sqlMessage
          })
        } else {
          res.status(200).json({
            data: results,
            message: 'Image updated Sucessfully'
          })
        }
    });
}


module.exports.getshopdetails = async(req, res) =>{
  try{
    const {shopname} = req.body
    var isowner = false
    var authorization = req.headers.authorization.split(' ')[1],
    decoded;
    decoded = jwt.verify(authorization, 'TOP_SECRET');
    var foundShop = await Shop.findOne({"shopname":shopname})
    console.log(foundShop)
    console.log(decoded.sub)
    console.log(foundShop["ownerID"])
    if(foundShop && foundShop["ownerID"]==decoded.sub)
    {
      isowner = true
    }
    res.status(200).json({"shop":foundShop,"isOwner":isowner})
  }
  catch(err)
  {
    console.log(err)
  }
}

module.exports.getShopImage = (req, res) =>{
  const {shopname} = req.body
  console.log(shopname)
    const sql = `select simgname from dbetsy.Shop where shopname=?`
    const values = [
        shopname
    ]
    connection.query(sql, values, function (error, results, fields) {
        if (error) {
          console.log(error);
          res.status(500).json({
            message: error.sqlMessage
          })
        } else {
          res.status(200).json({
            data: results,
            message: 'Image name retrieved Sucessfully'
          })
        }
    });
}