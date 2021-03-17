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
    firstName:{
        type:String,
        require:true, 
    
    },

    image:
    {
       type:String
    },

    email:{
        type:String,
        require : true,
        unique:true,
    },
    
    gender:{

        type: String

    },
    
    age:{
        type :Number
      
    },
    
    address:{
        type: String,
        require: true
    },
    role :{
        type : Number,
        default : 0
    },
    phoneNumber:{
        type:String
    },

    image :{
        type: String
    }

},{timestamps:true})

    const User = mongoose.model('User',schema);

    module.exports =User;