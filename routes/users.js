const express = require("express");
// route authentication
const {authenticate , authAdmin} = require("../middlewares/Authentication");
//token
const jwt = require("jsonwebtoken");
const fs = require("fs");

//model
const User = require("../models/User");
const Product = require("../models/Product");

//router
const userRouter = new express.Router();
const bcrypt = require("bcrypt");


//multer
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/userImages/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toDateString() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 50
  },
});

/////////////////////////////*******Admin Control  USER  AREA********///////////////

/// get All Users
userRouter.get("/" ,authAdmin, async (req, res) => {
  try {
    const users = await User.find({}).exec();
    res.send(users);
  } catch (error) {
    console.log(error);
    res.send({ message: "No users available" });
  }
});

///get User By id
userRouter.get("/:id" ,authAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id }).exec();
    res.send(user);
  } catch (error) {
    res.send({ message: "No Such User Exists" });
  }
});

//// Delete user

userRouter.delete("/:id" ,authAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id }).remove().exec();
    res.send({ message: "User is removed" });
  } catch (error) {
    console.log(error);
    res.statusCode = 401;
    res.send("not deleted");
  }
});

// //Delete All Users
// userRouter.delete("/",checkAuth, async (req, res) => {

//       const users = await User.find({}).remove().exec();
//     res.send(users)
// });


// User Area*******
// User Signup

userRouter.post("/signUp",upload.single("userImage"), async (req, res) => {
  const {
    userName,
    password,
    email,
    role = 0,
    firstName,
    lastName,
    gender,
    address,
    phoneNumber,
    age,
  } = req.body;

  if (!req.body) return res.send('Please Enter product data');
  if (!req.file) return res.send('Please upload a file');
  
  const image = req.file.filename;


  try {
    const hash = await bcrypt.hash(password, 10);
    console.log(hash);
    const user = await User.create({
      userName,
      password: hash,
      email,
      role,
      firstName,
      lastName,
      gender,
      address,
      phoneNumber,
      age,
      image,
    });

    res.send(user);
  } catch (err) {
    console.log(err);
    res.send({ message: "User was not created" });
  }
});

////*****User Login********///////

userRouter.post("/login", async (req, res) => {
  const { userName, password } = req.body;

  try {
    let user = await User.findOne({ userName }).exec();

    if (!user) {
      res.send("Wrong username or password");
      throw new Error("No such user found");
    }

    const isMatched = await bcrypt.compare(password, user.password);

    console.log(isMatched);

    if (isMatched) {
      //Generate token
      const token = jwt.sign({ id: user._id }, "Potato-Man");
      // console.log(token);
      // res.json(token);
      if (user.role == 1) {
        // res.json(token);
        res.send({ message: "Welcome Admin", token });
      } else {
        res.send({ message: "Welcome User", token });
      }
    } else {
      res.send("Wrong username or password");
      throw new Error("No such user found");
    }
  } catch (err) {
    console.log(err);
    res.json({
      status: false,
      message: "log in failed"
    });
  }
});

///// User profile //////

userRouter.post("/userprofile", authenticate, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.signedData.id });
    console.log(req.signedData);

    res.send(user);
  } catch (err) {
    res.send("Not Authenticated");
  }
});

//// Admin Profile 

userRouter.post("/adminDashBoard", authenticate,authAdmin, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.signedData.id });
    console.log(req.signedData);

    res.send(user);
  } catch (err) {
    res.send("Not Authenticated");
  }
});

///// Order by user

userRouter.post("/order", authenticate, async (req, res) => {
  const { _id } = req.body.product;
  const { quantity } = req.body;

  try {
    const order = await Product.findOne({ _id }).exec();
    const user = await User.findOne({ _id: req.signedData.id });

    const userUpdate = await User.updateOne(
      { _id: user._id },
      { order: { product: order._id, quantity } },
      { upsert: true }
    );
    console.log(userUpdate);
    res.send("ADDED ORDER SUCCESFULLY ");
  } catch (err) {
    console.log(err);
    res.send("ORDER IS NOT ADDED ");
  }
});

module.exports = userRouter;
