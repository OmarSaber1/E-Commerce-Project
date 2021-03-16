const express = require("express");
const app = express();
//model
const Product = require("../models/Product");
const User = require("../models/User");
//router
const productRouter = new express.Router();

const checkAuth = require("../middlewares/Authentication");

//multer
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images-uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toDateString() + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
});

////////////// PRODUCT AREA  /////////////

//get all  products -no need for authentication here
productRouter.get("/", async (req, res) => {
  const product = await Product.find().exec();
  res.send(product);
});


// //get product by id
productRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {

    const product = await Product.findOne({ _id: id }).exec();
    res.send(product);

  } catch (error) {
    console.log(error);
    res.send("no Such product Exist");
  }
});


//add product
productRouter.post("/", checkAuth,   upload.single("productImage"), async (req, res) => {
  try{ 
  const { name, category, description, price, quantity, country} =  req.body;
  console.log(req.body.name);
  // if (!req.body) return res.send('Please Enter product data');
  // if (!req.file) return res.send('Please upload a file');
  const image =  req.file.path; 
  console.log(req.file);
       
 
    const product = await Product.create(
      { name, category, description, price, quantity, country, image });
      res.send( {message:"product created successfully",product});
    }
    catch(err){
      console.log(err);
      res.send({message:"product was not created"});
  }
});

//delete product
productRouter.delete("/:id",checkAuth, async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({ _id: id }).remove().exec();

    res.send({status:true ,message:"Product is deleted"});

  } catch (error) {
    console.log(error);
    res.send({status:false ,message:"Product is not deleted"});
  }
});

//Update product
productRouter.patch("/:id",checkAuth, upload.single("productImage"), async (req, res) => {
  try {
    const id = req.params.id;
    const { name, category, description, price, quantity, country } = req.body;
    const image = req.file.path;
    const updatedProduct = await Product.updateOne(
      { _id: id },
      {
        name: name,
        category: category,
        description: description,
        price: price,
        quantity: quantity,
        country: country,
        image: image
      }
    ).exec();
    res.send({ messege: "Product updated successfully"});
  } catch {
    res.statusCode = 422;
    res.send({ status: false, message: "Update failed, try again" });
  }
});

module.exports = productRouter;
