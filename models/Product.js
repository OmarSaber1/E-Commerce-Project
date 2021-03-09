const mongoose = require('mongoose');
const Category = require('./Category');

const schema = mongoose.Schema({

    name:{
        type : String,
        require:true
    },
    category:{

        type:String,
        require:true
        // type:mongoose.Schema.Types.ObjectId,
        // ref:Category
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