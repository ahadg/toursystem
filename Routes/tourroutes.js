const express = require('express');
const router = express.Router();
const tourcontroller = require('../Controllers/tourcontroller');
const auth = require('../middleware/auth');

router.get('/landingdata', tourcontroller.getlandingdata);
router.post('/heartbeat',auth, tourcontroller.heart);
router.post('/heartbeattest',auth, tourcontroller.getallhearttest);
router.post('/searchdata',tourcontroller.searchdata);
router.post('/',tourcontroller.createtour);
router.post('/getalltour',tourcontroller.getall);
router.post('/:id',tourcontroller.updatatour);
router.get('/:id',tourcontroller.getatour);



module.exports = router;