const jwt = require('jsonwebtoken') 

const checkToken = (req, res, next) => {

    const secret = 'lkaiofjalaoirkajvnnauiaooi'
    const token = req.headers.authorization
    
    if(!token){
        return res.status(401).json({error: 'Acesso negado!'})
    }

    try{

        jwt.verify(token, secret)
        next()

    }catch(err){
        res.status(400).json({ error: "O Token é inválido!" });
    }

}

module.exports = checkToken