const express = require("express"); ///Express Package
const app = express();
const mongoose = require('mongoose');
var session = require('express-session')
const MongoStore = require('connect-mongo')
const path = require("path");

require("./db-connection");

//routes required
const userRouter = require("./routes/users");
const productRouter = require("./routes/products");
const orderRouter = require('./routes/order');

app.use(express.json()); ////// Parse JSON BODY PARSER
    
app.use(express.static('public'));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
//routes path
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use('/api/order',orderRouter);





app.listen(process.env.PORT||3000, () => {
    console.log("Server is up and listen to port 3000");
  });