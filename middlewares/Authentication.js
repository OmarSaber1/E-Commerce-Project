const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');


 module.exports.authenticate = async(req,res,next)=>{
    try {
          //get current user token by the header
          const {authorization} = req.headers;
          //decoding the token to yield hash, and compare it with the hashed data
          const signedData = jwt.verify(authorization, 'Potato-Man');
          req.signedData = signedData;
          next();
        } 
        catch (err) {
          console.error(err);
          res.statusCode = 401;
          res.json({ status: false, message: "Authentication failed" });
        }
  }
  
  module.exports.authAdmin = async(req,res,next)=>{
    try {
          //get current user token by the header
          const {authorization} = req.headers;
          //decoding the token to yield hash, and compare it with the hashed data
          const signedData = jwt.verify(authorization, 'Potato-Man');

            const user = await User.findOne({_id : signedData.id}).exec();

            if(user.role == 1){
              req.signedData = signedData;
              next();
            }
            else{
              throw new Error ("Admin Authentication Failed")
            }
        } 
        catch (err) {
          console.error(err);
          res.statusCode = 401;
          res.json({ status: false, message: "Authentication failed" });
        }
  }


