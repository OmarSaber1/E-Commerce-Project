const express = require("express");
const orderRoute = new express.Router();

const Order = require('../models/Order')
const Product = require('../models/Product');

const {authAdmin,authenticate} = require("../middlewares/Authentication");


//get all orders

orderRoute.get('/',authAdmin, async (req,res)=>{

    const orders = await Order.find().populate('products.productId userId').exec();
    // console.log(req.sess)
    res.json(orders)
})

    //get order by id   

orderRoute.get("/myOrder", authenticate, async (req, res) => {
    const userId = req.signedData.id;
    console.log( userId)

    try{
                // Only Authenticated user get thier orders

        const order = await Order.findOne({userId} ).exec();
        console.log(order )
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

orderRoute.post("/",authenticate, async(req,res)=>{

    const {products=[] ,userId=""} = req.body ;// {products, userId}
    try{
        // let a = (products)?length:""; 
        // const product = await Product.findOne({_id : productId}).exec();
        //old product
        console.log(products);

            let totalPrice = 0;

            for(let i = 0 ; i < products.length ; i++ ){

             // Old product 
                let product = await Product.findOne({_id : products[i].productId}); //ordered

                let id = product._id;

                totalPrice += product.price * products[i].quantity;

                let oldQuantity = product.quantity;

                if( oldQuantity - products[i].quantity < 0 ){

                   return res.send(`${products[i].productId} is sold out we have only ${oldQuantity}`)

                }
                await Product.updateOne({_id :id} , {quantity : oldQuantity - products[i].quantity })                
            }

            let order = await Order.create({userId ,products,totalPrice});
            console.log("Created Successfully");
            res.status(200).json(order);
    }
    catch(err){
        console.log(err)
        res.status(404).json({
            message : "Wrong product Id",
            error : err
        })
    }
})

//edit status of shippment

orderRoute.put("/:id",/* checkAuth, */ async (req, res) => {
    const id = req.params.id;
    const {status} = req.body;
    try {
        const order = await Order.findOneAndUpdate({ _id: id },{status});
         res.status(200).json(order);
        
    } catch (error) {
        res.status(404).json({
               message :"Order is not deleted",
               error :err
            } );
    }

  });

//delete order

orderRoute.delete("/:id",/* checkAuth, */ async (req, res) => {
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
                ////////
                /// Delete all orders for development stuff
                ///////

//   orderRoute.delete("/",/* checkAuth, */ async (req, res) => {
//     const id = req.params.id;

//     try {
//         const order = await Order.find().remove().exec();
    
//          res.status(200).json(order);
        
//     } catch (error) {
        
//         res.status(404).json({
//                message :"Orders is not deleted"
//             } );
//     }

//   });

module.exports = orderRoute;