const router = require('express').Router()
const PaymentController = require('../controllers/PaymentController')

router.post('/process_payment', PaymentController.processPayment)

module.exports = router