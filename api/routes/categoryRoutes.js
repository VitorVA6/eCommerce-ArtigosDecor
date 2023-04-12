const router = require('express').Router()
const CategoryController = require('../controllers/CategoryController')
const { imageUpload } = require('../utils/imageUpload')
const  removeImages  = require('../utils/removeImages')

router.post('/add', imageUpload.single('image'), CategoryController.create)
router.get('/get-all', CategoryController.getAll)
router.get('/:id', CategoryController.getById)
router.delete('/:id', CategoryController.remove)
router.patch('/:id', imageUpload.single('image'), removeImages, CategoryController.update)

module.exports = router