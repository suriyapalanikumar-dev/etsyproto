const connection = require("../config/database.js")


module.exports.isshopnameavailabile = (req, res) =>{
    const {shopname} = req.body
    const sql = `select * from dbetsy.Shop where shopname= ?`;
    connection.query(sql, [shopname], function (error, results, fields) {
        console.log(results)
        console.log(error)
        var message = ""
        var flag = 0
        if(error)
        {
          message =  error.sqlMessage
          flag = 1
        }
        else if (results.length==0) {
            res.status(200).json({
                data: shopname,
                message: 'Name available'
              })
        }
        else {
            message = "Name already taken"
            flag = 1
    }
    if(flag==1)
    {
        res.status(500).json({
            message:message
        })
    }
    })
}

module.exports.createshopname = (req, res) =>{
    const {shopname, ownerid} = req.body
    const sql = `INSERT INTO dbetsy.Shop (shopname, ownerid) VALUES(?,?);`
    const values = [
        shopname, 
        ownerid
    ]
    console.log(values)
    connection.query(sql, values, function (error, results, fields) {
        if (error) {
          console.log(error);
          res.status(500).json({
            message: error.sqlMessage
          })
        } else {
          res.status(200).json({
            data: results,
            message: 'Shop Registered Sucessfully'
          })
        }
    });
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


module.exports.getshopdetails = (req, res) =>{
    const {shopname, userid} = req.body

    const sql = `Use dbetsy;
    select Item.*, Shop.*,Purchase.purchasecount, User.usernaame, User.email  from Shop left join Item on Shop.shopname = Item.shopname
	left join Purchase on Purchase.purchasename = Item. itemname
    left join User on User.userid=Shop.ownerid where Shop.shopname=?;`
  //   const sql = `Use dbetsy;
  //   select Item.*, Shop.*,ShoppedItem.*, User.name, User.email  from Shop left join ShoppedItem on Shop.shopnum = ShoppedItem.shopnum 
	// left join Item on ShoppedItem.itemid = Item.itemid  
  //   left join User on User.userid=Shop.ownerid;`

    const values = [
        shopname

    ]
    console.log(values)
    connection.query(sql, values, function (error, results, fields) {
        if (error) {
          console.log(error);
          res.status(500).json({
            message: error.sqlMessage
          })
        } else {
        var owner = false
         if(userid==results[1].ownerid)
         {
            owner = true
         }
          res.status(200).json({
            data: {"data": results[1], "isowner":owner},
            message: 'Retrieved Shop details successfully'
          })
        }
    });
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