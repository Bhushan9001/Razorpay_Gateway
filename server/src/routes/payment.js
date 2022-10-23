const express = require('express');
const { order, paymentVerify } = require('../controllers/payment');

const router = express.Router()



//API Routes
router.post('/order',order);
router.post('/paymentVerify',paymentVerify)


module.exports = router;