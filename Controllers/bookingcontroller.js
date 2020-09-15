const stripe = require('stripe')('sk_test_SPaqUO8ih4NJ4p4VRkwOCiAd00RG3QuqXb');
const Tour = require('../Models/tourmodel');
const bookingmodel = require('../Models/bookingmodel');
const User = require('../Models/ussermodel');
const mongoose = require('mongoose');
const client = require('twilio')('ACa05fc77eec3f2c304c67392e27c794d1', '277614b2e5269f4fc1f2b72a7e0aac84');
const mailer  = require('nodemailer');


exports.getcheckoutsession  = async (req,res) => {
    console.log(req.body);
    console.log('welcome')
   // console.log(`${req.protocol}://${req.get('host')}/user/successfull?tourid="qhekqjw1"`)
  const tour = await Tour.findById(req.body.tourid);
  console.log(tour);
  const user = await User.findById(req.body.user)
 // console.log(tour.name)
 // console.log(req.body.tourid);
 // console.log(typeof(req.body.tourid));
  const session = await stripe.checkout.sessions.create({
       payment_method_types : ['card'],
     //  success_url: `${req.protocol}://${req.get('host')}/?tour=${req.params.tourid}&user=${'56rghf65etyrs'}&price=${tour.price}`,
   
     success_url: `${req.protocol}://${req.get('host')}/user/successfull?seats=${req.body.seats}
     &user=${req.body.user}&price=${tour.price * 100}&tour=${req.body.tourid}`, 
     cancel_url : `${req.protocol}://${req.get('host')}/tour/${tour.id}`,
       customer_email : user.email,
       client_reference_id : req.body.tourid,
       line_items : [
           {
               name : `${tour.name} Tour`,
               description : tour.summary,
               images : [`http://localhost:5000/uploads/${tour.images[0]}`],
              amount  : tour.price * 100,
              //* 100,
              currency : 'pkr',
              quantity : req.body.seats
            }
       ]
    })
    res.status(200).json({
        status : 'success',
        session
    })
    
}

// we could have create success path in react but path was showing while creating booking..
// so thats why we created middleware
exports.savebooking = async (req,res,next) => {

 // console.log(req.query);
  const {tour,user,price,seats} = req.query;
  if (!tour && !user && !price && !seats) {
    
    return next();
  }

  let theuser = await User.findById(user);
  console.log('msgg');
  console.log(theuser);
  if(theuser.phone)
  {
    client.messages.create({
      to: `+${theuser.phone}`,
      from: '+12565489804',
      body : `your booking has been succesfull, you booked ${seats} seats`
    }).then(messages => console.log(messages.sid));
   
    
  }
  console.log(theuser);
  
  let mail = {
    from : `muhmmadahad594@gmail.com`,
    //to : `${req.body.email}`,
    to : `${theuser.email}`,
    subject : 'Pakwalker Booking confirmation',
   
    html : `<div style="color:#001f3f;"><center><h3>Congratulation</h3></center><br/>
    <center><h4>Your Booking was successful. Your booked<b> ${seats}</b> seats. 
    we have successully proceed your payment of <b>${price}</b>pkr <br/>
    Enjoy our service,
    please give us your feedback when you'r done with tour.</center></h4></div> 
    `
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



   
    let thetour = await Tour.findById(tour);
     await Tour.findByIdAndUpdate(tour, {seatsavailable : thetour.seatsavailable - seats});
    console.log(thetour);
   // let seatleft = thetour.seatsavailable;
   // thetour.seatsavailable = seatleft - seats;
   // await thetour.save;
 ///console.log(tour);
 // console.log(tour.replace(/%20/g, ""))
 // console.log(tour.replace(/\s/g, ""))
//  console.log(tour.split(" ").join(""));
//  console.log(typeof(tour));
//  console.log(typeof(user));

    console.log(mongoose.Types.ObjectId.isValid(tour));
   
 //   tour =  mongoose.Types.ObjectId(tour);
 //  user = mongoose.Types.ObjectIdId(user);
    
    await bookingmodel.create({tour,user,price,seats})
    res.redirect('http://localhost:3000/')
  }



  exports.getuserbookings = async (req,res) => {
  //  console.log(req.user);
  //  console.log('bookinggss')
  let alluserbookings = await bookingmodel.find({user : req.user}).populate('tour');
   console.log(alluserbookings)
  // const tourid = alluserbookings.map(el => el.tour);
  //   console.log(tourid);
  // const tours = await Tour.find({_id : { $in : tourid}})
  // console.log(tours)
  // for(let i = 0; i<= tours.length ; i++)
   //{
     // for(let j=0 ; j<= alluserbookings.length ; j++)
    //  {
     //   tours[i].id == alluserbookings[i].tour ? tours[i].seats= alluserbookings[j].seats : ''  
     // }
  // }
  // console.log(tours)
   res.status(201).json({
     status : 'success',
     bookings : alluserbookings
   })

  }