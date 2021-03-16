const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
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