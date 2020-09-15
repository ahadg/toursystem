const express = require('express');

const usercontroller = require('../Controllers/usercontroller');
const auth = require('../middleware/auth');
const bookingcontroller = require('../Controllers/bookingcontroller');
const router = express.Router();

router.post('/sendemail', usercontroller.emailme);
router.post('/signup',usercontroller.signup);
router.post('/signin',usercontroller.login);
router.get('/getdata',auth,usercontroller.getdata);
router.post('/updatedata',auth,usercontroller.updateuserdata);
//router.post('/updatepic',usercontroller.uploadme);
router.post('/updatepassword',auth, usercontroller.updatepassword);
router.post('/getinitialdata',usercontroller.getinitial);
router.post('/booktour',auth,bookingcontroller.getcheckoutsession);
router.get('/successfull',bookingcontroller.savebooking);
router.get('/getbookings',auth,bookingcontroller.getuserbookings);
router.post('/resetmessage',usercontroller.resetmessage);
router.get('/resetpassword/:resettoken',usercontroller.resetpassword)
router.post('/resetupdatepassword',usercontroller.resetupdatepassword)
module.exports = router;