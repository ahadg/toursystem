const jwt = require('jsonwebtoken');
const user = require('../Models/ussermodel');



module.exports = function(req,res,next) {
 // get token from header
// console.log('the-x-token')
 //console.log(req.header('the-x-token'));



 // console.log("auth middleware called")
 const token = req.header('the-x-token');
  //console.log(token);
 // check if not token

 if (!token)
 {
     return res.status(401).json({
         error : 'not logged in , or you token has been expired',
         msg : 'no token , authorization denied'
     });
 }
 try {
  //  console.log("auth middleware called")
     const decode = jwt.verify(token , 
        //process.env.JWT_SECRET
        "yoursecret");
      
       // console.log(decode);
       
     req.user = decode.id;
     next();
 }
 catch (err){
     res.status(401).json({
        error : 'not logged in , or you token has been expired',
         msg : 'token is not valid'
     })
 }
}