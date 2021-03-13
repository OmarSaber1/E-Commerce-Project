const express = require("express");

//model
const Product = require("../models/Product");
const User = require("../models/User");
//router
const productRouter = new express.Router();

//multer

const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

////////////// PRODUCT AREA  /////////////

//get all  products
productRouter.get("/", async (req, res) => {
  const product = await Product.find().exec();
  res.send(product);
});


// //get product by id
productRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const product = await Product.findOne({ _id: id }).populate('category')
    .exec()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send("no Such product Exist");
    });
});

//add product
productRouter.post("/", upload.single("productImage"), async (req, res) => {

  const { name, category, description, price, quantity, country , image} = req.body;
  //console.log(image);
  //console.log(req.file.path);
  // const image = req.file.path;
    const categoryName = await Category.findOne({_id:category});
    console.log(categoryName)
  try{
    const product = await Product.create(
      { name, category, description, price, quantity, country, image })
      res.send( "product created successfully");
    }
    catch(err){
      console.log(err);
      res.send("product not Created");

  }
});

//delete product
productRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const product = await Product.findOne({ _id: id })
    .exec()
    .then((result) => {
      result.remove();
      res.send("product is deleted");
    })
    .catch((err) => {
      res.send("product not deleted");
    });
});

//Update product
productRouter.patch("/:id", upload.single("productImage"), async (req, res) => {
  try {
    const id = req.params.id;
    const { name, category, description, price, quantity, country } = req.body;
    const image = req.file.path;
    const updateProduct = await Product.updateOne(
      { _id: id },
      {
        name: name,
        category: category,
        description: description,
        price: price,
        quantity: quantity,
        country: country,
        image: image,
      }
    ).exec();
    res.send({ messege: "Product updated successfully" });
  } catch {
    res.statusCode = 422;
    res.send({ success: false, message: "Update failed, try again" });
  }
});

module.exports = productRouter;
