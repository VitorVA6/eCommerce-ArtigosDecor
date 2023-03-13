const router = require('express').Router()
const UserController = require('../controllers/UserController')

const checkToken = require('../utils/checkToken')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/getuser', checkToken, UserController.getUser)
router.patch('/update', checkToken, UserController.updateUser)
router.post('/test', checkToken, (req, res) => {
    
    res.json({message: 'autenticado'})

})

module.exports = router