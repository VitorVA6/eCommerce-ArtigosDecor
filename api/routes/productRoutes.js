const router = require('express').Router() 
const ProductController = require('../controllers/ProductController')
const checkToken = require('../utils/checkToken')
const { imageUpload } = require('../utils/imageUpload')

router.post('/add', checkToken, imageUpload.single('image'), ProductController.create)
router.get('/all', ProductController.getAll)
router.get('/:id', ProductController.getProductById)
router.patch('/:id', checkToken, imageUpload.single('image'), ProductController.updateProduct)

module.exports = router