const connection = require("../config/db")
const Item = require("../model/item")

module.exports.enrollItem = (req, res) =>{
  try{
    const {itemname, 
      itemcount,
      itemphoto,
      itemcategory,
      itemdesc,
      price,
      shopname} = req.body
      let newItem = new Item({"itemname":itemname, "itemcount":itemcount,"itemphoto":itemphoto, "itemcategory":itemcategory,"itemdesc":itemdesc,"price":price,"shopname":shopname})
      newItem.save()
      if(newItem)
      {
        res.status(200).json({
          data: "Item Created"
        })
      }
      else{
        res.status(500).json({
          data: "Item cannot be created"
        })
      }
  }
  catch(err){
    res.status(500).json({
      data:err
    })
  }

}

module.exports.fetchItem = (req,res) =>{
  const {itemid} = req.body
  const sql = `SELECT Item.*, User.usernaame FROM dbetsy.Favorites left join dbetsy.Item on Favorites.itemid=Item.itemid left join dbetsy.User on User.userid=Favorites.userid  where Item.itemid=?`
    const values = [
       itemid
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
            message: 'Fetched Items Successfully'
          })
        }
    });

}
  