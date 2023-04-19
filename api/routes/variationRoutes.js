const router = require('express').Router()
const VariationController = require('../controllers/VariationController')

router.post('/add', VariationController.create)
router.get('/get-all', VariationController.getAll)
router.get('/:id', VariationController.getById)
router.delete('/:id', VariationController.remove)
router.patch('/:id', VariationController.update)
router.put('/:id', VariationController.removeOption)

module.exports = router