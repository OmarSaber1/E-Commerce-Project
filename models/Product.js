const mongoose = require('mongoose');

const schema = mongoose.Schema({

    name:{
         type : String,
        require:true
    },
    category:{
        type :String,

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
        require:true
    }
},{timestamps : true})


const product = mongoose.model('product',schema)


module.exports = product;