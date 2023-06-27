const express = require('express');
const { isAuthenticatedUser } = require('../middlewares/authMiddleware');
const { processPayment, sendStripApi } = require('../controllers/paymentController');
const router = express.Router();

router.post('/payment/process', isAuthenticatedUser, processPayment);
router.get('/stripeapi', isAuthenticatedUser, sendStripApi);

module.exports = router;