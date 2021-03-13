const mongoose = require('mongoose');

const orderSchema = mongoose.Schema([{

        userId : {
                type : mongoose.Schema.Types.ObjectId , ref : 'User' ,
                require:true
       },
        productId : {
                 type : mongoose.Schema.Types.ObjectId , ref : 'product' ,
                 require:true
        },
        quantity : {
                 type : Number ,
                  require :true ,
                   default : 1
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

const order = mongoose.model('order',orderSchema);

module.exports = order;