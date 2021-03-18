const mongoose = require("mongoose"); ///Mongoose Package
//// MONGoose Connect to Atlas DATABASE ////////
//url will be replaced with *process.env.MONGO_DB* for security
const url =
  "mongodb+srv://Admin:aCXJ9tXiRdDFHZn9@cluster0.q7ibq.mongodb.net/E-Shop?retryWrites=true&w=majority";

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
     useFindAndModify: false 
  })
  .then((result) => {
    console.log("connected To Atlas DB");
  })
  .catch((err) => {
    console.log("can't connect to Atlas DB");
  });

    