const express= require('express');
const viewscontroller = require('../Controllers/viewcontroller');

const router = express.Router();

router.get('/login',viewscontroller.signin);
router.get('/overview', viewscontroller.overview);
router.post('/overview', viewscontroller.overview);
module.exports = router;