const jwt = require('jsonwebtoken') 

const secret = 'lkaiofjalaoirkajvnnauiaooi'

const createUserToken = (user, req, res) => {

    token = jwt.sign( {
        id: user._id
    }, secret )

    res.status(200).json({
        message: 'Você está autenticado',
        token: token,
        email: user.email
    })
}

module.exports = createUserToken