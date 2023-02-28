const router = require('express').Router() 
const ProductController = require('../controllers/ProductController')

router.post('/add', ProductController.create)

module.exports = router