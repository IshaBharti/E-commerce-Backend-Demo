const router = require("../routes/user");
const cart = require("../model/cart");
const User = require("../model/user");
const category = require("../model/category");
const Product = require("../model/product");
const { _logFunc } = require("nodemailer/lib/shared");
const addCart = async (req, res) => {
  const { id } = req.params;
  const user_id = req.data;
  console.log(user_id);
  try {
    const add = await cart.create({ productId: id, userId: user_id });
    res.send(add);
  } catch (err) {
    throw err;
  }
};
// ******************************  get Product In Cart *******************************************
const get_product = async (req, res) => {
  console.log(req.data);
  id=req.params
  console.log(id);


  try {
    const data = await Product.find({userId:req.data}).select("product");
    return res.send(data);
  }catch(err){
    throw err
  }
    
}
// ***************** cart with users **************


module.exports = { addCart, get_product };
