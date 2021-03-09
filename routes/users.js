const express = require("express");

//token
const jwt = require("jsonwebtoken");

//model
const User = require("../models/User");
const Product = require('../models/Product')
const Category = require('../models/Category')
//router
const userRouter = new express.Router();
const bcrypt = require("bcrypt");
const path = require("path");

//multer
const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, /*new Date().toISOString() +*/ file.originalname);
  },
});

var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});


//////////////////////////////      USER     AREA       ///////////////

///  get All Users

userRouter.get("/", async (req, res) => {
    const users = await User.find({}).exec();
    res.send(users);
  });

  ///get User By id

  userRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
  
    const user = await User.findOne({ _id: id })
      .exec()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send("no Such User Exist");
      });
  });
  
  ///  User Signup
  
  userRouter.post(
    "/signUp",
    upload.single("productImage"),
    async (req, res) => {
      const { userName, password, email } = req.body;
      const image = req.file.path;
  
      try {
        const hash = await bcrypt.hash(password, 10);
        console.log(hash);
        const user = await User.create({
          userName,
          password: hash,
          email,
          image,
        });
        res.send(user);
      } catch (err) {
        console.log(err);
        res.send("not created");
      }
    }
  );
  
  //// User Login   ///////
  
  userRouter.post("/login", async (req, res) => {
    const { userName, password, email } = req.body;
  
    try {
      const user = await User.findOne({ userName }).exec();
  
      if (!user) {
        throw new Error("No such user found");
      }
  
      const isMatched = await bcrypt.compare(password, user.password);
  
      console.log(isMatched);
  
      if (isMatched) {
        const token = jwt.sign({ id: user._id }, "Potato-Man");
        console.log(token);

        if(user.role == 1 )
        res.send("Welcome Admin")
        else{
          res.send("Not Admin")
        };

      } else {
        res.send("Wroing username or password");
      }
    } catch (err) {
      console.log(err);
    }
  });
  
  ///// User profile Token authorization//////
  
  userRouter.post("/profile", async (req, res) => {
    try {
      const { authorization } = req.headers;
      const verifying = jwt.verify(authorization, "Potato-Man");
      const user = await User.findOne({ _id: verifying.id });
  
      res.send(user);
    } catch (err) {
      res.send("Not Authenticaed");
    }
  });
  //// Delete user
  
  userRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
  
    const user = await User.findOne({ _id: id })
      .exec()
      .then((result) => {
        result.remove();
        res.send("removed");
      })
      .catch((err) => {
        res.send("not deleted");
      });
  });
  
  ///// Order by user
  
  userRouter.post("/order", async (req, res) => {
    const { _id } = req.body.product;
    const { quantity } = req.body;
  
    try {
      const order = await Product.findOne({ _id }).exec();
      const { authorization } = req.headers;
      const verifying = jwt.verify(authorization, "Potato-Man");
      const user = await User.findOne({ _id: verifying.id });
  
      const userUpdate = await User.updateOne(
        { _id: user._id },
        { order: { product: order._id, quantity } },
        { upsert: true }
      );
      console.log(userUpdate);
    } catch (err) {
      console.log(err);
    }
  });
  




module.exports = userRouter;
