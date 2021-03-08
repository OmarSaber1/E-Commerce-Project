    const mongoose = require('mongoose');            ///Mongoose Package 
    const express = require('express');               ///Express Package
    const app = express();
    const jwt = require('jsonwebtoken');
    const bycrpt = require('bcrypt');
    const path = require('path'); 
    const db = require('./db-connection')
    
    const User = require('./models/User');              ////import Users Collection
    const Product = require('./models/Product');        //// import Product collection

    const productRouter = require('./routes/products');         /////
    const userRouter = require('./routes/users');                   ////   Importing routers


    app.use('/api/product',productRouter)
    app.use('/api/user',userRouter)
    
    //App . user CORDS 

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
      });
    // app.set('view engine', 'ejs');

    const multer = require('multer');

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'public/uploads/')
        },
        filename: function (req, file, cb) {
          cb(null, file.originalname)
        }
      })

      var upload = multer({ 
          storage: storage,
          limits : {
              fileSize: 1024* 1024 *3
          }
         })


    app.use(express.json()) ////// Parse JSON BODY PARSER

    app.use(express.static(path.join(__dirname, 'public'))) 

    app.listen(3000,()=>{console.log("App is Listeining to port 3000")})