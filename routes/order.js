const express = require("express");
const orderRoute = new express.Router();

const Order = require('../models/Order')
const Product = require('../models/Product');


    ////////////////////////////////////////////////////

    //get all orders

orderRoute.get('/', async (req,res)=>{

    const orders = await Order.find().populate('product').exec();
    console.log(req.sess)
    res.json(orders)
})

    //get order by id   

orderRoute.get("/:id", async (req, res) => {
    const id = req.params.id;
    try{
        const order = await Order.findOne({ _id: id }).populate('product').exec();
        res.status(200).json(order)
    }
    catch(err){
        res.status(404).json({
            message : " Not such order id exist",
            error : err
        })
    }
     
  });

  //add an order

orderRoute.post("/",async(req,res)=>{

    const { productId , quantity ,userId} = req.body ;
    try{
        const product = await Product.findOne({_id : productId}).exec();
        if(product && userId){
            const order = await Order.create({userId ,productId , quantity});
            console.log("Created Successfully")
            res.status(404).json(order)
        }
    }
    catch(err){
        res.status(404).json({
            message : "Wrong product Id",
            error : err
        })
    }
})


//delete order

orderRoute.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const order = await Order.findOne({ _id: id })
      .exec()
      .then((result) => {
        result.remove();
        res.status(200).json("order is deleted");
      })
      .catch((err) => {
        res.status(404).json({
            message :"product not deleted",
            error :err
         } );
      });
  });

module.exports = orderRoute;