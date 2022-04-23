const connection = require("../config/db")
const Item = require("../model/item")
const jwt = require("jsonwebtoken");

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

module.exports.fetchItem = async(req,res) =>{
  //console.log(req.params)
  const shopname = req.params.shopname
  console.log(shopname)
  var temp = await Item.find({"shopname":shopname})
  console.log(temp)
  if(temp)
  {
    var resp = []
    temp.forEach(i=>{
      resp.push(i["itemname"])
    })
    res.status(200).json(resp)  
  }
  else{
    res.status(500).json("Error in Updating profile details")
  }
}

module.exports.updateItem = async(req,res) =>{
  const {itemname, 
    itemcount,
    itemdesc,
    price} = req.body
  var temp = await Item.findOne({"itemname":itemname})
  if(!temp)
  {
    res.status(500).json("Please enter an existing item")
  }
  if(temp)
  {
    let data = {}
     if(itemcount)
     {
       data["itemcount"] = itemcount
     }
     if(itemdesc)
     {
       data["itemdesc"] = itemdesc
     }
     if(price)
     {
       data["price"] = price
     }
     console.log(data)
     var temp1 = await Item.findOneAndUpdate({"itemname":itemname},data)
     res.status(200).json(temp1)
  }
  else{
    res.status(500).json("Error in Updating profile details")
  }
}

module.exports.getallItems = async(req, res) =>{
  try{
    var temp = await Item.find({},{"_id":1, "itemname":1, "isFavorite":1, "price":1,"itemphoto":1}).sort([['createdAt', -1]])
    res.status(200).json(temp)
  }
  catch(err)
  {
    res.status(500).json("Error in fetching items")
  }
}