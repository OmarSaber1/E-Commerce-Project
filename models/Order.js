const mongoose = require('mongoose');

const orderSchema = mongoose.Schema([{

        product : { type : mongoose.Schema.Types.ObjectId , ref : 'product'},
        quantity : { type : Number , require :true , default : 1}

}])

const order = mongoose.model('order',orderSchema);

module.exports = order;