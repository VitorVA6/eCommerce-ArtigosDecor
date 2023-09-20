const jwt = require('jsonwebtoken') 

const checkToken = (req, res, next) => {
    const token = req.headers.authorization
    
    if(!token){
        return res.status(401).json({error: 'Acesso negado!'})
    }

    try{
        jwt.verify(token, process.env.JWT_SECRET)
        next()
    }catch(err){
        res.status(400).json({ error: "O Token é inválido!" });
    }
}

module.exports = checkToken