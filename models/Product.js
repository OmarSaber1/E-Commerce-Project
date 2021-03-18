const mongoose = require('mongoose');

const schema = mongoose.Schema({

    name:{
         type : String,
        require:true
    },
    category:{
        type :String,
        require:true
    },
    description :{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    quantity:{
        type:Number,
        require:true
    },
    country:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true,
        default:""
    }
},{timestamps : true})


const Product = mongoose.model('Product',schema)  //products collection


module.exports = Product;