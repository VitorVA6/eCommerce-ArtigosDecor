const router = require('express').Router()
const PaymentController = require('../controllers/PaymentController')

router.post('/process_payment', PaymentController.processPayment)
router.post('/notify-shipment', PaymentController.notifyShipment)
router.get('/get-all', PaymentController.getAll)
router.get('/:id', PaymentController.getPaymentById)
router.put('/:id', PaymentController.cancelPayment)

module.exports = router