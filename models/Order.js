const mongoose = require('mongoose');

const orderSchema = mongoose.Schema([{

        userId : {
                type : mongoose.Schema.Types.ObjectId , ref : 'User' ,
                require:true
       },

        productId : {
                 type : mongoose.Schema.Types.ObjectId , ref : 'Product' , 
                 require:true
        },
        
        quantity : {
                 type : Number ,
                  require :true ,
                   default : 1
                },

         totalPrice :{
                        type: Number
                },

        startShippingAt : {
                 type : Date,
                 default : Date.now()
                },
                
        deliveryAt :{
                type:Date,
                default: () => new Date(+new Date() + 7*24*60*60*1000)
        }

}])

const Order = mongoose.model('Order',orderSchema);

module.exports = Order;