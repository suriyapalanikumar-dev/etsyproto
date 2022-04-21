const connection = require("../config/database.js")

module.exports.enrollItem = (req, res) =>{
    const {itemname, 
        itemcount,
        itemphoto,
        itemcategory,
        itemdesc,
        price,
        shopname} = req.body
    const sql = `INSERT INTO dbetsy.Item ( itemname, 
        itemcount,
        itemphoto,
        itemcategory,
        itemdesc,
        price,
        shopname) VALUES(?,?,?,?,?,?,?);`
    const values = [
        itemname, 
        itemcount,
        itemphoto,
        itemcategory,
        itemdesc,
        price,
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
            message: 'Item Enrolled Sucessfully'
          })
        }
    });
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
  