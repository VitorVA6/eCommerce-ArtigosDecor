const router = require('express').Router()
const CatalogController = require('../controllers/CatalogController')
const { imageUpload } = require('../utils/imageUpload')
const  removeImages  = require('../utils/removeImages')

const checkToken = require('../utils/checkToken')

CatalogController.createFirst()

router.get('/settings', CatalogController.getSettings)
router.patch('/update', checkToken, imageUpload.array('images'), removeImages, CatalogController.updateCatalog)

module.exports = router