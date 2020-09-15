const review = require('../Models/reviewmodel');

const tourmodel = require('../Models/tourmodel');

const multer = require('multer');
const moment = require('moment')

const user= require('../Models/ussermodel');
const Booking = require('../Models/bookingmodel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieparser= require('cookieparser');






exports.protect= async (req,res,next) => {
    let token = req.cookies.jwt32;
  console.log(token)
    if(!token)
    {
        res.writeHead(302, {
            'Location': 'loginme'
            //add other headers here...
          });
          res.end();
      //  res.status(200).json({
       //     status : 'Unauthorized'
       // })
    }
    let myid;
    const decode = await jwt.verify(token,'mysecret', (err,decode) => {
        if(err)
        {
            // token expired error than redirect to another page
            console.log(err)  
            res.writeHead(302, {
                'Location': 'loginme'
                //add other headers here...
              });
              res.end();   
        }
        else
        {
            console.log(decode);
            myid = decode.data;
        }
      

    });
  
 // myid =  myid.replace(/^\s+|\s+$/gm,' ');
 // console.log(typeof(myid))
 // console.log(myid);
 // console.log(`${myid}`)
 // just to remove space
  myid =  myid.replace(/^\s+|\s+$/gm,'');
 // console.log(myid);
//   console.log(mongoose.Types.ObjectId.isValid(myid))
  // console.log(myid);
  // console.log(mongoose.Types.ObjectId.isValid('5f1fc5658f598d12a06df0d3'))
   //  
   //ObjectId.fromString(myid);
   //mongoose.Types.ObjectId.fromString(myid)
 //  res.writeHead(302, {
 //   'Location': 'login'
    //add other headers here...
 // });
//  res.end();
   const currentuser = await user.findOne({
       _id : myid
   });
     if(!currentuser){
        res.status(200).json({
            status : 'Unauthorized'
        })
     }
     req.user = currentuser;
    // res.locals.user = currentuser;
   //console.log(res.locals.user); 
      next();
}


exports.protectadmin= async (req,res,next) => {
    let token = req.cookies.jwt32;
  console.log(token)
    if(!token)
    {
        res.writeHead(302, {
            'Location': 'loginme'
            //add other headers here...
          });
          res.end();
      //  res.status(200).json({
       //     status : 'Unauthorized'
       // })
    }
    let myid;
    const decode = await jwt.verify(token,'mysecret', (err,decode) => {
        if(err)
        {
            // token expired error than redirect to another page
            console.log(err)  
            res.writeHead(302, {
                'Location': 'loginme'
                //add other headers here...
              });
              res.end();   
        }
        else
        {
            console.log(decode);
            myid = decode.data;
        }
      

    });
  
 // myid =  myid.replace(/^\s+|\s+$/gm,' ');
 // console.log(typeof(myid))
 // console.log(myid);
 // console.log(`${myid}`)
 // just to remove space
  myid =  myid.replace(/^\s+|\s+$/gm,'');
 // console.log(myid);
//   console.log(mongoose.Types.ObjectId.isValid(myid))
  // console.log(myid);
  // console.log(mongoose.Types.ObjectId.isValid('5f1fc5658f598d12a06df0d3'))
   //  
   //ObjectId.fromString(myid);
   //mongoose.Types.ObjectId.fromString(myid)
 //  res.writeHead(302, {
 //   'Location': 'login'
    //add other headers here...
 // });
//  res.end();
   const currentuser = await user.findOne({
       _id : myid
   });
     if(!currentuser){
        res.status(200).json({
            status : 'Unauthorized'
        })
     }
     if(currentuser.role != 'admin')
     {
        {
            res.writeHead(302, {
                'Location': 'loginme'
                //add other headers here...
              });
              res.end();
          //  res.status(200).json({
           //     status : 'Unauthorized'
           // })
        }
     }
     req.user = currentuser;
    // res.locals.user = currentuser;
   //console.log(res.locals.user); 
      next();
}


exports.checklogin = async (req,res) => {
    console.log(req.body);
    if(!req.body.body.mpassword || !req.body.body.email)
    {
        res.status(200).json({
            status : 'Error',
            msg : 'Input all field'
        })
    }
    let theuser = await user.findOne({email : req.body.body.email})
    if(!theuser)
    {
        res.status(200).json({
            status : 'Error',
            msg : 'User not found'
        })
    }
    else if (theuser.role == 'user')
    {
        res.status(200).json({
            status : 'Error',
            msg : 'Only admin can access'
        })
    }
// console.log(req.body);
 console.log(theuser)
    let result = await bcrypt.compare(req.body.body.mpassword,theuser.password);
    console.log(result);
    if(!result)
    {
        res.status(200).json({
            status : 'Error',
            msg : 'Password is invalid'
        })
    }
   let token = await jwt.sign({ data :` ${theuser._id}`},
    'mysecret',{expiresIn : '3h'});

        const cookieOptions = {
          
            expires : new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
         // if httponly true then we wont be able to delete cookie or replace
            //  httpOnly : true,
           
           
          };
          res.cookie('jwt32',token,cookieOptions);

    if(result)
    {
        res.status(200).json({
            status : 'success'
        })
    }
}



exports.manageuser = async (req,res) => {
    console.log(req.body)
  try {
    let nuser;
      if (req.body.value === 'delete')
      {
       await user.findByIdAndDelete(req.body.id);
       res.status(201).json({
           status : 'success',
           msg : 'deleted successfuly'
       })
      }
      else if (req.body.value === 'admin')
      {
        nuser = await user.findByIdAndUpdate(req.body.id, {role : req.body.value});
        res.status(201).json({
           status : 'success',
           msg : `${req.body.value} successfuly`
       })
         
        
      }
      else
      {
     nuser = await user.findByIdAndUpdate(req.body.id, {status : req.body.value});
     res.status(201).json({
        status : 'success',
        msg : `${req.body.value} successfuly`
    })
      }
      console.log(nuser)

  } catch (error) {
    res.status(201).json({
        status : 'Error',
        msg : `Error`
    })
     console.log(error) 
  }
}

exports.getalluser = async (req,res)=> {
  try {
    const users = await user.find();
  //  res.status(200).json({
    //  status : 'success',
   //   data : users
   // })
    res.status(200).render('users.ejs',{
      users : users
    })
  } catch (error) {
     console.log("error fetching data");
    res.status(404).json({
      error : error.response
    })
  }
}



exports.getallreview = async (req,res) => {
  try {
      const reviews =await review.find();
      res.status(201).json({
          status : "success",
          data : reviews
      })
  } catch (error) {
      console.log(error);
  }
}


const sharp = require('sharp');

const multstorage = multer.memoryStorage();
const multerfilter = (req,file,cb) => {
  // goal is to check , if the file is image
 if (file.mimetype.startsWith('image')) {
   cb(null, true)
 }
 else 
 {
   console.log('not image')
 }
}

const upload = multer({
  storage : multstorage,
  fileFilter : multerfilter
})
exports.uploaduserphoto = upload.single('file')

exports.resizeUserPhoto = (req,res) => {
 // console.log("hii")
  if(!req.file) return next();
 // console.log("hiiii")
 // console.log(req.file);

  req.file.filename = `user-${'1212dqwdqw'}-${Date.now()}.jpeg`
// file was stored in buffer, converted also saving path is given
  sharp(req.file.buffer).resize(1500,1500)
  .toFormat('jpeg').jpeg({quality : 80}).toFile(`public/uploads/${req.file.filename}`);
  res.status(201).json({
    status : 'success',
    success : true,
    filename : req.file.filename
  })
}

exports.deletebooking =async (req,res) => {
    console.log('deletebookingreached')
    const theid = req.body.bookid;
     console.log(req.body)
  //  try {
       // await Booking.findByIdAndDelete(theid);     
   // } catch (error) {
     //   console.log(error);
   // }
    res.status(201).json({
        status : 'success',
        msg : 'Deleted successfuly'
    })
   
}



/*
var storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,'public/uploads/')
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
    console.log("uploading image")
     
   upload(req,res,err => {
       if (err) return res.json({ success : false, err})
       console.log(req.file.filename);
       
       return res.json({success : true, image: res.req.file.path, filename : res.req.file.filename})
   })
}
*/



exports.edittour = async (req,res) => {
    try {
  console.log('edittour');
  console.log(req.body);
        const oldtour = await tourmodel.findById(req.body.tourid);
        oldtour.images.map(image => req.body.data.images.push(image));
        console.log(req.body);
        let tour = await tourmodel.findByIdAndUpdate(req.body.tourid, req.body.data);
        res.status(201).json({
            status : 'success',
            data : {
                tour
            }
        })
    } catch (error) {
        res.status(404).json({
            data : {
               error
            }
        })
    }
}


exports.createtour = async (req,res) => {
    // as soon as it will recieve error , move out from try block and move to catah
 try {
     console.log(req.body);
    const newtour = await tourmodel.create(req.body);
    res.status(201).json({
        status : 'success',
        data : {
            newtour
        }
    })
 } catch (error) {
     console.log(error);
     res.status(404).json({
        data : {
           error
        }
    })
 }
  
}

exports.getall = async (req,res) => {
    try {
        const alltour = await tourmodel.find(req.query );
        res.status(201).render('tours.ejs',{
            status : 'success',
            tours :
                alltour,
                moment
            
        })
    } catch (error) {
        console.log(error);
    }
}

exports.updatatour = async (req,res) => {
    try {
        console.log(req.params.id);
        console.log(req.body);
        const tour = await tourmodel.findByIdAndUpdate(req.params.id,req.body, {
             new : true,
    
         });
        res.status(201).json({
            status : 'success',
            data : {
                tour
            }
        })
    } catch (error) {
        console.log(error);
    }
}
exports.getatour = async (req,res) => {
    try {
        console.log(req.params.id)
        const tourid = req.params.id;
        const tour = await tourmodel.findById(req.params.id).populate('reviews');
        res.status(201).render('edittours.ejs',{
            status : 'success',
            tourid,
            tour
            
        })
    } catch (error) {
        console.log(error);
    }
}

exports.deletetour = async (req,res) => {
    try {
        console.log(req.body);
        let tour = await tourmodel.findByIdAndDelete(req.body.id);
    res.status(201).json({
        status : 'success',
        msg : 'successfuly deleted'
    })
    } catch (error) {
        res.status(404).json({
            msg : 'error'
        })
    }
}