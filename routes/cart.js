const express = require("express");
const cartRouter = new express.Router();

const Cart = require('../models/Cart')
const Order = require('../models/Order')
const Product = require('../models/Product');


    ////////////////////////////////////////////////////

    //get all carts

cartRouter.get('/', async (req,res)=>{

    const cart = await Cart.find().populate('productId').populate('userId').exec();
    res.json(cart)
})

    //get cart by id   

cartRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    try{
        const cart = await Cart.findOne({ _id: id }).populate('productId').populate('userId').exec();
        res.status(200).json(cart)
    }
    catch(err){
        res.status(404).json({
            message : " Not such cart id exist",
            error : err
        })
    }
     
  });

  //add a cart

cartRouter.post("/",async(req,res)=>{

    const { productId ,userId } = req.body ;
    try{
        const product = await Product.findOne({_id : productId}).exec();
        if(product && userId){
            const cart = await Cart.create({userId ,productId });
            console.log("Created Successfully")
            res.status(200).json("Created Successfully cart")
        }
    }
    catch(err){
        res.status(404).json({
            message : "Wrong cart Id",
            error : err
        })
    }
})


//delete a cart

cartRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const cart = await Cart.findOne({ _id: id })
      .exec()
      .then((result) => {
        result.remove();
        res.status(200).json("cart is deleted");
      })
      .catch((err) => {
        res.status(404).json({
            message :"cart not deleted",
            error :err
         } );
      });
  });

module.exports = cartRouter;