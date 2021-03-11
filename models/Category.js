const mongoose = require("mongoose"); 

const schema = mongoose.Schema({
    name:{
        type:String,
        require : true
    },
    // product :[{
    //     type : mongoose.Schema.Types.ObjectId , ref : 'product'
    // }]
},{timestamps : true})

const Category = mongoose.model('Category',schema); //categories collection

module.exports = Category;