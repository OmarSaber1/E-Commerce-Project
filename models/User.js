const mongoose = require('mongoose');

const schema = mongoose.Schema ({

    userName:{
        type:String,
        // minlength :3,
        // maxlength :8,
        require:true,
        unique : true
    },

    password:{
        type:String,
        require:true,
        // minlength : 8,
        // maxlength : 15
    },   

    role:{                      /// Admin or user 
        type:String,
        default:0,
        // enum : [ "0" , "1" ]
    },

    image :{
        type: String,
        require : true,
    },

    order:[{
        product :{
            type : mongoose.Schema.Types.ObjectId , ref : 'product',
            require : true
        },
        quantity : {
            type : Number,
            require : true
        }   
    },{timestamps:true}],

    email:{
        type:String,
        require : true,
        unique:true,
        // maxlength : 20
    },

    gender:{
        type: String,
        require : true,
        // enum : ["m","f"]
    },

    age:{
        type :Number,
        // min : 10,
        // max : 100
    },

    address:{
        type: String
    },

    phoneNumber:{
        type:String,
        // minlength : 10,
        // maxlength : 15
    },
    firstName:{
        type:String,
        require:true,
        // minlength : 3 ,
        // maxlength : 8
    },

    lastName:{
        type:String,
        require:true,
        // minlength : 3 ,
        // maxlength : 8
    }

},{timestamps:true})

    const User = mongoose.model('User',schema);

    module.exports =User;