    
    const mongoose = require('mongoose');           ///Mongoose Package 
    const express = require('express');               ///Express Package
    const app = express();
    const jwt = require('jsonwebtoken');
    const bycrpt = require('bcrypt');
    const path = require('path'); 
    
    
    const User = require('./models/User');    ////import Users Collection
    const Product = require('./models/Product');
    
    //App . user CORDS 

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
      });
    // app.set('view engine', 'ejs');

    const multer = require('multer');
const product = require('./models/Product');

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


                    //// MONGoose Connect to Atlas DATABASE ////////

    const url =     'mongodb+srv://Admin:aCXJ9tXiRdDFHZn9@cluster0.q7ibq.mongodb.net/E-Shop?retryWrites=true&w=majority';
        
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })   
      .then((result)=>{
          console.log("connected To atlas DB")
        app.listen(3000,()=>{console.log("Server is up and listen to port 3000")})
      })
      .catch((err)=>{
          console.log('cant connect to Atlas DB');
      })
      


      //////////////////////////////      USER     AREA       ///////////////

                                            ///  get All Users

    app.get('/api/user',async(req,res)=>{
        const users = await User.find({}).exec();
       res.send(users)     
    })
                                            ///get User By id

    app.get('/api/user/:id', async (req,res)=>{

            const id = req.params.id;

            const user = await User.findOne({_id:id}).exec()
            .then((result)=>{
                res.send(result)
            })
            .catch((err)=>{
                res.send("no Such User Exist")
            });
    })

                             ///  User Signup 

    app.post('/api/user/signUp',upload.single('productImage'),async(req,res)=>{

            const{userName,password,email} = req.body;
            const image = req.file.originalname;

            try{
                const hash = await bycrpt.hash(password,10);
                console.log(hash)
                const user =  await User.create({userName,password : hash,email,image})
                res.send(user);
            }
           catch(err){
               console.log(err)
                    res.send("not created")
                }
            })

                      //// User Login   ///////


    app.post('/api/user/login',async(req,res)=>{
        const {userName , password , email} = req.body;
   
        try{
            const user = await User.findOne({userName}).exec();
    
            if(!user){throw new Error("No such user found")}
    
            const isMatched = await bycrpt.compare(password,user.password);

            console.log(isMatched)

            if(isMatched){
                const token =   jwt.sign({id:user._id} , "Potato-Man")
                console.log(token)
                res.send(user)  
            } 
            else{ res.send("Wroing username or password")}
        }
        catch(err){
            console.log(err)
        }
    })

                    ///// User profile Token authorization//////

    app.post('/api/user/profile',async(req,res)=>{
        try{
            const {authorization} = req.headers;
            const verifying = jwt.verify(authorization,"Potato-Man");
            const user = await User.findOne({_id:verifying.id});
            
            res.send(user)
        }
        catch(err){
            res.send("Not Authenticaed")
        }
        
    })
                //// Delete user 

    app.delete('/api/user/:id',async(req,res)=>{
        const id = req.params.id;

        const user = await User.findOne({_id:id}).exec()
        .then((result)=>{
            result.remove();
            res.send("removed")
        })
        .catch((err)=>{
            res.send("not deleted")
        });
    })



    ///// Order by user 


    app.post('/api/user/order',async(req,res)=>{

      const {_id } = req.body.product;
      const { quantity } = req.body;

try{

    const order = await Product.findOne({_id}).exec();
      const {authorization} = req.headers;
      const verifying = jwt.verify(authorization,"Potato-Man");
      const user = await User.findOne({_id:verifying.id});    
      
      const userUpdate = await User.updateOne({_id : user._id},{order:{product:order._id,quantity}},{upsert:true})
      console.log(userUpdate)
}
catch(err){
    console.log(err);
    
}
    })



                             ////////////// PRODUCT AREA /////////////

        app.get('/api/product',async(req,res)=>{

            const product = await Product.find({}).exec();
            res.send(product);

        })

        app.get('/api/product/:id', async (req,res)=>{

            const id = req.params.id;
    
                const product = await Product.findOne({_id:id}).exec()
                .then((result)=>{
                    res.send(result)
                })
                .catch((err)=>{
                    res.send("no Such product Exist")
                });
    
            
        })

        app.post('/api/product',async(req,res)=>{

            const {name,category,description,price,quantity,country,image} = req.body;
            const product = await Product.create({name,category,description,price,quantity,country,image},(err)=>{
                if(err){
                    res.send("Not Created");
                }
                else{
                    res.send(product);
                }
            })
        })

        app.delete('/api/product/:id',async(req,res)=>{
            const id = req.params.id;
    
            const user = await Product.findOne({_id:id}).exec()
            .then((result)=>{
                result.remove();
                res.send("removed")
            })
            .catch((err)=>{
                res.send("not deleted")
            });
        })
