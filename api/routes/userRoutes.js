const router = require('express').Router()
const UserController = require('../controllers/UserController')

const checkToken = require('../utils/checkToken')

UserController.createFirst()

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/send-email-recovery', UserController.sendEmailRecovery)
router.get('/getuser', checkToken, UserController.getUser)
router.patch('/update', checkToken, UserController.updateUser)
router.get('/verify/:token', checkToken, UserController.verify)

module.exports = router