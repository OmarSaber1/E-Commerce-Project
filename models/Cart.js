const mongoose = require('mongoose') ;

const cartSchema = mongoose.Schema({
    userId : { type : mongoose.Schema.Types.ObjectId , ref :'User' ,require:true},
    productId : [{
        type : mongoose.Schema.Types.ObjectId , ref : 'product' , require :true
    }]
})

const cartModel = mongoose.model('cart',cartSchema);

module.exports = cartModel;