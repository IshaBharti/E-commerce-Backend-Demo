const mongoose = require("mongoose");
const { Schema } = mongoose;
const cartSchema = new Schema({
  
 
  userId:{
    type:String
  },
  productId:{
    type:mongoose.Types.ObjectId,
  },
  total_product: {
    type: String,

  },
  userId: { type: Schema.Types.ObjectId, ref: "User" },

}

  
  


)

  


var cart = mongoose.model("cart",cartSchema )

module.exports = cart;