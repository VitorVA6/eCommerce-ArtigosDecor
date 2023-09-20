const jwt = require('jsonwebtoken') 
const User = require('../models/UserModel')

const getUserByToken = async (token)=> {
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({_id: decoded.id})

        return user
    }catch(err){
        return undefined
    }
}

module.exports = getUserByToken