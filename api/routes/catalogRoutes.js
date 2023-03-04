const router = require('express').Router()
const CatalogController = require('../controllers/CatalogController')

const checkToken = require('../utils/checkToken')

CatalogController.createFirst()

router.get('/settings', CatalogController.getSettings)
router.patch('/update', checkToken, CatalogController.updateCatalog)

module.exports = router