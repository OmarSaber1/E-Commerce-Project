
const express = require('express');

    //// Cateorgy Router //////
const categoryRouter = express.Router();

    // Models ////

const Category = require('../models/Category')
const Product = require('../models/Product')
const User = require("../models/User");

  ///// POST ////////

  categoryRouter.post('/',async(req,res)=>{

    try{
         const {name } = req.body;
         console.log(name)
        const category = await Category.create({name});  
        
        res.send("Category Created Succssfully")
    }
    catch(err){
      console.log(err)
       res.send("Category not created")
    }
 })

     ////////// get /////////

     categoryRouter.get('/',async(req,res)=>{

     const categories = await Category.find({}).exec();

       res.send(categories)
 })


 module.exports = categoryRouter;