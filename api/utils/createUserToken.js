const jwt = require('jsonwebtoken') 

const createUserToken = (user, req, res) => {

    token = jwt.sign( {
        id: user._id
    }, process.env.JWT_SECRET )

    res.status(200).json({
        message: 'Você está autenticado',
        token: token,
        email: user.email
    })
}

module.exports = createUserToken