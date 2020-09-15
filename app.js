const express =  require('express');
const app = express();
const expresslayout  = require('express-ejs-layouts');
const cors = require('cors');
const path = require('path')

app.use(expresslayout);

require('./server');


const userroute = require('./Routes/userroutes');
const tourroute = require('./Routes/tourroutes');
const reviewroute = require('./Routes/reviewroutes');
const viewroutes = require('./Routes/viewroutes');
const dashboardgetdata =require('./Routes/dashboardgetroute');
const dashboardviewdata = require('./Routes/dashboardviewroute');
const path = require('path');
const bodyparser = require('body-parser');
const cookieparser= require('cookie-parser');


app.use(cookieparser())

app.use(bodyparser.urlencoded({
  extended : true
}));
app.use(expresslayout);
app.use(express.static(path.join(__dirname,'public')));

// default bevahiour it always look for views
app.set('view engine','ejs');

app.use(cors());

//const pathss = path.join(__dirname, "views");
//console.log(pathss);
//console.log(path.parse(__dirname));


app.use(express.json({
    extended : false
  }))



  app.use('/user',userroute);
app.use('/review',reviewroute);
app.use('/tour',tourroute);

// dashboard routes
app.use('/dashboardget',dashboardgetdata);
app.use('/dashboardview',dashboardviewdata);

  
app.use('/',viewroutes);
// global error handler middleware error
app.all('*', (req,res,next)=> {
  //res.status(404).json({
   // status : 'fail',
    //message : 'cant find this url',
  //  message : `cant find ${req.originalUrl} on this server`
//  });
   // global error constructor
  const err = new Error(`cant find ${req.originalUrl} on this server`);
  err.statusCode = 404;
  err.status = 'fail';
  // when we pass any argument in next method it will skip all middleware and go to global error handlor

  next(err);
})
app.use((err,req,res,next)=> {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  res.status(err.statusCode).json({
    status : err.status,
    message : err.message
  })
})
if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

app.get('*',(req,res)=> {
  res.sendFile(path.resolve(__dirname,'client','build','index.html'))
})

}
app.listen(process.env.PORT || 5000, fun => {
    console.log('app is running on 5000');
})