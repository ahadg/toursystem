const express = require('express');

const router = express.Router();
const reviewss = require('../Controllers/reviewcontroller');
const auth = require('../middleware/auth');

router.get('/',reviewss.getallreview);
router.post('/',auth,reviewss.createreview);
router.post('/like/:id',auth,reviewss.like)
router.post('/dislike/:id',auth,reviewss.dislike);


module.exports = router;