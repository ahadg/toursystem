const express = require('express');

const router = express.Router();
const viewscontroller = require('../Controllers/dashboardviewcontroller');
const getdatacontroller = require('../Controllers/dashboarddatacontroller');



router.post('/',getdatacontroller.createtour);
router.post('/edittour',getdatacontroller.edittour);
router.get('/getalltour',getdatacontroller.getall);
router.patch('/:id',getdatacontroller.updatatour);
router.get('/:id',getdatacontroller.getatour);

router.post('/checklogin',getdatacontroller.checklogin)

router.get('/',getdatacontroller.getallreview);
router.post('/muser',getdatacontroller.manageuser);
router.post('/deletebooking',getdatacontroller.deletebooking);
router.post('/deletetour',getdatacontroller.deletetour);

router.get('/users',getdatacontroller.getalluser);


module.exports = router;