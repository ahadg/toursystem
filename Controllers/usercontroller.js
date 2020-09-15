const user= require('../Models/ussermodel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const contactus = require('../Models/contactusmodel');

const mailer  = require('nodemailer');
const crypto = require('crypto');


exports.emailme = async (req,res) => {
  console.log('usercontroller')
  console.log(req.body);
await contactus.create({
  username : req.body.name,
  email : req.body.email,
  message : req.body.message
})
  // from error https://stackoverflow.com/questions/44761407/nodemailer-with-gmail-from-address-does-not-change
res.status(200).json({
  status : 'success'
})
  

  
  

  }

  exports.resetmessage = async(req,res) => {
    console.log('resetttt')
    console.log(req.body);
    const theuser = await user.findOne({email : req.body.email});

       if(!theuser) {
         res.json({msg : 'no user found with that email'})
       }
    const resettoken = crypto.randomBytes(32).toString('hex');
    theuser.resetpasswordtoken  = resettoken;
    theuser.resettokenexpire = Date.now() + 10 * 24 * 60 * 60 * 1000;
   await theuser.save({validateBeforeSave : false});
    console.log(req.body);

    const resetURL = `http://127.0.0.1:5000/user/resetpassword/${resettoken}`;
    console.log(resetURL);
    // from error https://stackoverflow.com/questions/44761407/nodemailer-with-gmail-from-address-does-not-change
    let mail = {
      from : `muhmmadahad594@gmail.com`,
      //to : `${req.body.email}`,
      to : `muhmmadahad594@gmail.com`,
      subject : 'Pakwalker Reset password',
      text : `To reset your password please click on the link http://127.0.0.1:5000/user/resetpassword/${resettoken}`
    }
    
      const smtpTransport= mailer.createTransport({
        service : 'Gmail',
        auth : {
          user : 'muhmmadahad594@gmail.com',
          pass : 'ahad594@!'
        }
      })
      smtpTransport.sendMail(mail,function(err){
      if(err) {
        console.log(err)
        res.status(404).json({
          status : 'fail'
        })
      }
      else {
        console.log('email sended');
        res.status(201).json({
          status : 'success'
        })
      }
      })
    
    
  
    }

    exports.resetpassword = async (req,res,next) => {
    //  console.log('resettppt');
    //  console.log(req.params.resettoken);
      const theuser = await user.findOne({resetpasswordtoken : req.params.resettoken,
        resettokenexpire :  { $gt : Date.now()}
      })

      if(!theuser) {
        res.status(404).json({
          msg : 'Token is invalid or has expired'
        })
      }
    res.status(201).render('resetpassword', {
      status :'success',
      resettoken : req.params.resettoken
    })
      
    }

    exports.resetupdatepassword = async (req,res) => {
      console.log(req.body)
     
      try {
      const theuser = await user.findOne({resetpasswordtoken : req.body.resettoken})
     
      if(!theuser) {
        res.status(400).json({
          msg : 'Token is invalid or has expired'
        })
      }
console.log(theuser);
 // let thepassword =await bcrypt.hash(req.body.password, 12);
console.log(req.body.password);
 // await user.findOneAndUpdate({resetpasswordtoken : req.params.resettoken,  password : thepassword})
   theuser.password = req.body.password;
  await theuser.save({validateBeforeSave : false});

  res.status(201).json({
    status : 'success'
  })
} catch (error) {
  console.log(error)
}
    

    }

    


/*
var storage = multer.diskStorage({
  destination : (req,file,cb) => {
      cb(null,'uploads/')
  },
  filename : (req,file,cb) => {
      cb(null, `${Date.now()}_${file.originalname}`)
  },
  fileFilter : (req,file,cb) => {
      const ext = path.extname(file.originalname)
      if (ext !== '.jpg' || ext !== '.png') {
          return cb(res.status(404).end("only jpg, png are allowed"), false);
      }
      
      cb(null,true);
  }
})

var upload = multer({storage: storage}).single("file");



exports.uploadme = async(req,res) => {
  console.log('uploading images');
  console.log(req.file);
  console.log(req.file.buffer);
   
 upload(req,res,err => {
     if (err) return res.json({ success : false, err})
     console.log(req.file.filename);
     return res.json({success : true, image: res.req.file.path, filename : res.req.file.filename})
 })
}
*/



const signtoken = (id) => {
    return jwt.sign({id},"yoursecret",{expiresIn : (Date.now() + 10 * 24 * 60 * 60 * 1000)});
}
const createSendToken = (statuscode , res , users) => {
  const token = signtoken(users._id);
 
res.ouruser = token;
 res.status(statuscode).json({
    status : 'success',
    token,
    data  : {
      users
    }
  });
  
}

exports.getdata =   async (req,res) => {
  try {
    console.log(req.user);
      const myuser = await user.findById(req.user).select('-password');
      console.log(myuser);
          res.status(201).json({
              myuser
          })
  }
  catch(err){
      console.log(err.message);
      res.send(err)
  }

}; 

exports.updateuserdata = async (req,res) => {
  
  try{
     console.log(req.body);  
     const newuser = await user.findByIdAndUpdate(req.user, req.body, {
       new : true
       // just to get updated data in current instance
     })
     createSendToken(201,res,newuser);
   
 }
 catch (err)
 {
     res.status(404).json({
       status : 'fail',
       err
     });
     console.log(err);
 }
}

exports.getinitial = async (req,res) => {
  //   res.send('hi'); 
   try{
    // console.log(req.body);
    let existuser = await user.findOne({email : req.body.email});
    if(existuser)
    {  
      res.status(201).json({
        status : 'success',
        existuser
      })
    }
    else{
      res.status(404).json({
        status : 'fail',
        message : 'not found'
      })
    }
 }
 catch (err)
 {
     res.send(err);
     console.log(err);
 }
 }

exports.signup = async (req,res) => {
 //   res.send('hi'); 
  try{
    console.log(req.body);
   let checkemail = await user.findOne({email : req.body.email});
  
   if(!checkemail)
   {  
    const newuser = await user.create(req.body);
    createSendToken(201,res,newuser);
   }
   else{
     res.status(404).json({
       status : 'fail',
       message : 'please change the email, there is already a user exist with that email'
     })
   }
}
catch (err)
{
    res.send(err);
    console.log(err);
}
}

exports.login = async (req,res,next) => {
  const {password, email}  = req.body;
  console.log(password);
  console.log(email);

  // ERROR   cannot set headers after they are send to the client
  // error was bcz we were sending two responses
  // to avoid this use return to exit function
  // what if he is using software like postman, then validation also required
  if (!password || !email){
    const err = new Error('please provide password and email to login');
    err.statusCode = 404;
    err.status = 'error'
     next(err);
    return    
  }
  
  //ERROR  UnhandledPromiseRejectionWarning: TypeError: Converting circular structure to JSON
  // error was bcz we were missing await
  const nuser = await user.findOne({email});
  let result;
  console.log(nuser);
  if(nuser){
  //result = password === nuser.password;
  //console.log(result);

  result = await bcrypt.compare(password,nuser.password);
  }
 if(!nuser || !result)
 {
  const err = new Error('please provide correct password and email');
  err.statusCode = 404;
  err.status = 'error'
   next(err);
  return 
 }

  createSendToken(201,res,nuser);

}

exports.updatepassword = async (req,res) => {
  console.log(req.user);
    try {
    //  console.log('updateee')
    const theuser =   await user.findById(req.user);
   // console.log('hi1');
 //   console.log(theuser.password);
  //  console.log(req.body.currentpassword);
    let result = await bcrypt.compare(req.body.currentpassword,theuser.password); 
  //  console.log(result);
    if(result)
    {
     // theuser.password = req.body.newpassword;
      try {
       // console.log('hi2');
        let npassword =  await bcrypt.hash(req.body.newpassword, 12)
       let newuser = await user.findByIdAndUpdate(req.body.userid, {password : npassword}, {
         new : true
       })

      //  console.log(newuser)
        res.status(200).json({
          status : 'success',
          newuser
        })
      } catch (error) {
        console.log(error);
      }
     
    }
    else 
    {
      res.status(404).json({
        status : 'fail',
        msg :'your password was not correct'
      })
    }
    } catch (error) {
      console.log(error)
    }
}

exports.protect = async (req, res , next) =>{
  // 1)check if there is a token
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
      token = req.headers.authorization.split(" ")[1];
  }
  else if (req.cookies.jwt){
 token = req.cookies.jwt;
  }

  if(!token)
  {
    const err = new Error("YOu are not logged in! must be logged in to access this route")
    err.statusCode = 404;
    err.status = 'error'
     next(err);
      return next(err);
    
  }

  // 2) verify token
  // will return a promise    protect routes part 2 2:50
 const decode = await promisify(jwt.verify)(token,"hi i ma ahdada");
console.log(decode)

 
// after these two step site is secured,, but not really secure enough
// for other two steps , protecting tour routes part 2 , 14:30

// 3) check if user still exists
console.log(decode.id)
console.log(typeof decode.id)
 const currentuser = await user.findById(decode.id);
   
 //

// 4) check if user changed password after token was created



req.user = currentuser;
console.log(req.user);
 next();
}

// we have passed admin,userguide as arguments, and turn it into array
// then check if req.user.role have admin or userguide
exports.restrictto = (...roles) => {
 return (req, res, next) => {
//  const ouruser =   user.findById(req.user);
 // console.log(JSON.parse(ouruser));
  // Authorization user roles video,, userid in jwt is missing,, i think we missed something in a video
 // console.log(ouruser);
 console.log(req.user.role);
 console.log(roles);
  if (!roles.includes(req.user.role)){
  return next(new apperror("you dont have permission to perform this action",403))
 }
 next(); 
}
}


