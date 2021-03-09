const express = require("express");

//// Cateorgy Router //////
const categoryRouter = express.Router();

// Models ////

const Category = require("../models/Category");
const Product = require("../models/Product");
const User = require("../models/User");

///// post category ////////

categoryRouter.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name);
    const category = await Category.create({ name });

    res.send("Category Created Succssfully");
  } catch (err) {
    console.log(err);
    res.send("Category not created");
  }
});

////////// get all cateogries/////////

categoryRouter.get("/", async (req, res) => {
  const categories = await Category.find({}).exec();

  res.send(categories);
});

//get products by category
categoryRouter.get("/:category", async (req, res) => {
  const category = req.params.category;
  // console.log(req.params);
  try {
    const productsByCategory = await Product.find({
      category: category,
    }).exec();
    res.send(productsByCategory);
  } catch {
    res.send("Category does not exist");
  }
});

module.exports = categoryRouter;
