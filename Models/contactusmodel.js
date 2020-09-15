const mongoose = require('mongoose');

let contactusmodel = mongoose.Schema({
   username : {
       type : String
   } ,
   email : {
       type : String
   },
   message : {
       type : String
   },
   date : {
       type : String,
       default : new Date()
   }
})

module.exports = contactus = mongoose.model('contactus',contactusmodel);