const mongoose = require("mongoose"); ///Mongoose Package
//// MONGoose Connect to Atlas DATABASE ////////

const url =
  "mongodb+srv://Admin:aCXJ9tXiRdDFHZn9@cluster0.q7ibq.mongodb.net/E-Shop?retryWrites=true&w=majority";

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("connected To Atlas DB");
  })
  .catch((err) => {
    console.log("can't connect to Atlas DB");
  });
