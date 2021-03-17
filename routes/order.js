const express = require("express");
const orderRoute = new express.Router();

const Order = require('../models/Order')
const Product = require('../models/Product');

const checkAuth = require("../middlewares/Authentication");

//get all orders

orderRoute.get('/',checkAuth, async (req,res)=>{

    const orders = await Order.find().populate('Product').exec();
    console.log(req.sess)
    res.json(orders)
})

    //get order by id   

orderRoute.get("/:id",checkAuth, async (req, res) => {
    const id = req.params.id;
    try{
        const order = await Order.findOne({ _id: id }).populate('Product').exec();
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

orderRoute.post("/",checkAuth, async(req,res)=>{

    const {products=[] ,userId=""} = req.body ;// {products, userId}
    try{
        let a = (products)?length:""; 
        const product = await Product.findOne({_id : productId}).exec();
        if(product && userId){
            const order = await Order.create({userId ,productId , quantity});
            console.log("Created Successfully");
            res.status(200).json(order);
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

orderRoute.delete("/:id",checkAuth, async (req, res) => {
    const id = req.params.id;

    try {
        const order = await Order.findOne({ _id: id }).remove().exec();
    
         res.status(200).json("Order is deleted");
        
    } catch (error) {
        
        res.status(404).json({
               message :"Order is not deleted",
               error :err
            } );
    }

  });

module.exports = orderRoute;