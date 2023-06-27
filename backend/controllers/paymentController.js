const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const stripe = require('stripe')("sk_test_51KmcMMSF5zA9srd1yRjKOu6uKPFRqHWfSMzMheIy7yGIORdSKEoCAETWCqwVxAElHQB9vyKQitL0X5hCOx3M7ftE00f9484gMZ");

// console.log("Key", process.env.STRIPE_SECRET_KEY)

// Process stripe payments   =>   /api/v1/payment/process
exports.processPayment = catchAsyncErrors(async (req, res, next) => {

    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'inr',

        metadata: { integration_check: 'accept_a_payment' }
    });

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })

})

// Send stripe API Key   =>   /api/v1/stripeapi
exports.sendStripApi = catchAsyncErrors(async (req, res, next) => {

    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    })

})