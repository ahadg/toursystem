const express= require('express');
//const viewscontroller = require('../Controllers/viewcontroller');
//const usercontroller = require('../Controllers/usercontroller');
//const tourcontroller = require('../Controllers/tourcontroller');
const viewscontroller = require('../Controllers/dashboardviewcontroller');
const getdatacontroller = require('../Controllers/dashboarddatacontroller');
const router = express.Router();

router.get('/bookings',getdatacontroller.protectadmin,viewscontroller.getbooking);

router.post('/tour',getdatacontroller.createtour);

router.get('/loginme',viewscontroller.signin)
router.get('/dashboard',getdatacontroller.protectadmin,viewscontroller.dashboard);
router.get('/addtour',getdatacontroller.protectadmin,viewscontroller.profile);
router.get('/users',getdatacontroller.protectadmin,getdatacontroller.getalluser);
router.get('/tours',getdatacontroller.protectadmin,getdatacontroller.getall);

//router.patch('/tour/:id',tourcontroller.updatatour);
router.get('/gettour/:id',getdatacontroller.getatour);
router.post("/uploadImage",getdatacontroller.uploaduserphoto,getdatacontroller.resizeUserPhoto);

module.exports = router;