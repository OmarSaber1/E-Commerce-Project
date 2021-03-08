const express = require("express"); ///Express Package
const app = express();

require("./db-connection");
const path = require("path");

//routes required
const userRouter = require("./routes/users");
const productRouter = require("./routes/products");


app.use(express.json()); ////// Parse JSON BODY PARSER

app.use(express.static(path.join(__dirname, "/")));

//routes path
app.use("/api/user", userRouter);
app.use("/api/user", productRouter);


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.listen(process.env.PORT||3000, () => {
    console.log("Server is up and listen to port 3000");
  });