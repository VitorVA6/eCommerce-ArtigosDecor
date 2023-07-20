const router = require('express').Router()
const PaymentController = require('../controllers/PaymentController')

router.post('/process_payment', PaymentController.processPayment)
router.get('/get-payment/:id', PaymentController.getPayment)

module.exports = router