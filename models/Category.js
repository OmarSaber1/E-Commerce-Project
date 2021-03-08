const mongoose = require("mongoose"); 

const schema = mongoose.Schema({
    name:{
        type:String,
        require : true
    }
},
{timestamps : true})

const category = mongoose.model('Category',schema);

module.exports = category;