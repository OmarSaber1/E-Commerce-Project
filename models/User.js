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
    lastName:{
        type:String,
        require:true,
     
    },
    role:{                      /// Admin or user 
        type:String,
        default:0
    },
    
    order:[  {
        product :{
            type : mongoose.Schema.Types.ObjectId , ref : 'Product',
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
    
    phoneNumber:{
        type:String
    },

    image :{
        type: String
    }

},{timestamps:true})

    const User = mongoose.model('User',schema);

    module.exports =User;