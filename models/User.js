const mongoose = require('mongoose');

const schema = mongoose.Schema ({

    userName:{
        type:String,
        require:true,
        unique : true
    },
    password:{
        type:String,
        require:true
    },     
    role:{                      /// Admin or user 
        type:Number,
        default:0,
        require:true
    },
    image :{
        type: String,
        require : true
    },
    order:[{
        product :{
            _id : {type : String , require : true}
        },
        quantity : {
            type : Number,
        }   
    }],
    email:{
        type:String,
        require : true,
        unique:true
    },
    gender:{
        type: String,
        require : true
    },
    birthDate:{
        type: Date
    },
    address:{
        city:{
            type: String
        },
        street:{
            type:String
        }
    },
    phoneNumber:{
        type:String
    },
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    }

},{timestamps:true})

    const User = mongoose.model('User',schema);

    module.exports =User;