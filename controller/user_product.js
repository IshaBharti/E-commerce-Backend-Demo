const Product = require("../model/product");
const User = require("../model/user");
const router = require("../routes/user");
const Category = require("../model/category");
// *************ALL Product**************************
const get_all_product = async (req, res) => {
  try {
    const data = await Product.find();
    res.send(data);
  } catch {
    console.log(err);
  }
};
// *******************updateProduct*************************************
const product_update = async (req, res) => {
  const data = req.body;
  const result = await Product.findOne({
    product: data.product,
  });
  const id = req.params.id;
  try {
    const check_id = await Product.findOne({ _id: id });
    // res.send(check_id)
  } catch (err) {
    res.send("Id  not found");
  }
  try {
    const result = await Product.findOne(
      { _id: req.params.id },
      {
        product: req.body.product,
      }
    );

    console.log(result, "hello");
    res.send({ status: 200, message: "succesfulupdate Doc" });
  } catch (err) {
    console.log(err.message);
  }
};
// *********************Delete Product************************

const delete_product = async (req, res) => {
  try {
    const result = await Product.deleteOne({ id: req.params.id });
    console.log(result);

    res.send({ status: 200, message: "Deleted successfully" });
  } catch (err) {
    console.log(err.message);
  }
};
//   ****************add_category***************
const add_category = async (req, res) => {
  console.log(req.data._id);
  try {
    // console.log(req.data,"{{{{{{{{{{{{{{{{");
    const add_product = { userId: req.data._id, ...req.body };
    const data = await Category.create(add_product);
    console.log(data);

    return res.status(200).send({ status: 200, message: `Category  is added` });
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};

// ***************fetch data*************
const fetch_data = async (req, res) => {
  try {
    const data = await User.aggregate([
      {
        $lookup: {
          from: "products",
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ["$userId", "$$userId"] }],
                },
              },
            },
          ],
          as: "Products",
        },
      },
      {
        $lookup: {
          from: "categories",
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ["$userId", "$$userId"] }],
                },
              },
            },
          ],
          as: "categories",
        },
      },
    ]);
    res.send(data);
  } catch (err) {
    throw err;
  }
};
module.exports = { get_all_product, product_update, delete_product, add_category, fetch_data };
