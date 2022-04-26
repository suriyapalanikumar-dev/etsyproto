const connection = require("../config/db")
const jwt = require("jsonwebtoken");
const Shop = require("../model/shop");

module.exports.isshopnameavailabile = async(msg,callback) =>{
    const {shopname} = req.body
    var authorization = req.headers.authorization.split(' ')[1],
    decoded;
    decoded = jwt.verify(authorization, 'TOP_SECRET');
    let foundShop = await Shop.findOne({"shopname": shopname });
    if(!foundShop)
    {
      callback(null,{
        data: "Available",
        message: 'Shop Name'
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
      callback(null,{
        data: "Shop Name Created"
      })
    }

}

module.exports.updateshopimage = async(msg,callback) =>{
  try{
    const {imgname,shopname} = req.body
    var temp = await Shop.findOneAndUpdate({"shopname":shopname}, {"shopphoto":imgname})
    if(temp)
    {
      callback(null,"Profile details updated")
    }

  }
  catch(error)
  {
    console.log({"error":error})
  }
}


module.exports.getshopdetails = async(msg,callback) =>{
  try{
    const {shopname} = req.body
    var isowner = false
    var authorization = req.headers.authorization.split(' ')[1],
    decoded;
    decoded = jwt.verify(authorization, 'TOP_SECRET');
    var foundShop = await Shop.findOne({"shopname":shopname})
    // console.log(foundShop)
    // console.log(decoded.sub)
    // console.log(foundShop["ownerID"])
    if(foundShop && foundShop["ownerID"]==decoded.sub)
    {
      isowner = true
    }
    callback(null,{"shop":foundShop,"isOwner":isowner})
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
          callback({
            message: error.sqlMessage
          })
        } else {
          callback(null,{
            data: results,
            message: 'Image name retrieved Sucessfully'
          })
        }
    });
}