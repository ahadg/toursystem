const tourmodel = require('../Models/tourmodel');
const usermodel = require('../Models/ussermodel');
const Booking = require('../Models/bookingmodel');
const contactus  = require('../Models/contactusmodel');
const moment = require('moment');


exports.overview = async (req,res) => {
     const tours = await tourmodel.find();
     console.log(tours);
     console.log(tour.name);
    res.status(201).render('overview.ejs', {
        tour : tours
    });
}
exports.signin = (req,res) => {
    res.status(201).render('login');
}
exports.getbooking = async(req,res) => {
     const allbooking = await Booking.find().populate('user').populate('tour');
   //  console.log(allbooking);
    res.status(201).render('bookings.ejs', {
        bookings : allbooking
    });
}

 
exports.dashboard = async (req,res) => {
    console.log("thedashboard")
   const tour = await tourmodel.aggregate([{
       $match : {}
   },
  { $group : {
       _id : null,
        totaltours : {$sum : 1},
        avgrating : {$avg : '$ratingAverage'}
   }
}
])    
const user = await usermodel.aggregate([{
    $match : {}
},
{ $group : {
    _id : null,
     totalusers : {$sum : 1}
}
}
]) 
var today = new Date();
const yesterday = new Date(today.valueOf() - 1000 * 60 * 60 * 24);
//console.log(today);
//console.log(yesterday); 
var todayuser = await usermodel.aggregate([{
    $match : { 'createdat' : {'$gt' : yesterday}}
}
])
let messages = await contactus.find();

// console.log(tour[0].totaltours);
// console.log(user);
// console.log(todayuser);
    res.status(200).render('dashboard', {
        tour,
        user,
        todayuser,
        messages,
        moment
    });
  }

  exports.profile = (req,res)=> {
      res.render('addtour');
  }
