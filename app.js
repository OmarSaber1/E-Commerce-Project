const express = require("express"); ///Express Package
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
require("./db-connection");
const cors = require("cors");

//Enable cors for all domains
app.use(cors());

//routes required
const userRouter = require("./routes/users");
const productRouter = require("./routes/products");
const orderRouter = require("./routes/order");

///////////////////////////////

// logging  the request url, method, and  time
app.use((req, res, next) => {
  const time = new Date();
  console.log(
    "Time:",
    time.getHours(),
    ":",
    time.getMinutes(),
    ":",
    time.getSeconds()
  );
  console.log("Method:", req.method);
  console.log("URL:", req.url);
  next();
});

app.use(express.json()); ////// Parse JSON BODY PARSER
app.use(express.static("public"));
// app.use(express.static('public/uploads'));

//routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);

// a global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ error: "internal server error" });
  next(err);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is up and listen to port 3000");
});

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
