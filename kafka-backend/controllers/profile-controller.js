const connection = require("../config/db")
const jwt = require("jsonwebtoken");
const User = require("../model/user")
module.exports.updateprofileimage = async(msg,callback) =>{
    const {imgname} = req.body
    console.log(imgname)
    //find userid
    var authorization = req.headers.authorization.split(' ')[1],
    decoded;
    decoded = jwt.verify(authorization, 'TOP_SECRET');
    //console.log(decoded)
    var temp = await User.findOneAndUpdate({"_id":decoded.sub}, {"profileUrl":imgname})
    if(temp)
    {
      callback(null,"Profile details updated")
    }
  }

  
  