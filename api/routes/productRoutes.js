const router = require('express').Router() 
const ProductController = require('../controllers/ProductController')
const checkToken = require('../utils/checkToken')
const { imageUpload } = require('../utils/imageUpload')
const  removeImages  = require('../utils/removeImages')

router.post('/add', checkToken, imageUpload.array('images'), ProductController.create)
router.get('/feed', ProductController.xmlMaker)
router.get('/all', ProductController.getAll)
router.get('/filter', ProductController.filter)
router.get('/get-cart', ProductController.getCart)
router.patch('/favorite/:id', checkToken, ProductController.favoriteProduct)
router.get('/:id', ProductController.getProductById)
router.patch('/:id', checkToken, imageUpload.array('images'), removeImages, ProductController.updateProduct)
router.delete('/:id', checkToken, ProductController.deleteProduct)
router.put('/select/:id', checkToken, ProductController.selectOption)
router.put('/unselect/:id', checkToken, ProductController.unSelectOption)
router.post('/upload-link', ProductController.createByFile)


module.exports = router