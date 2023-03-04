const jwt = require('jsonwebtoken') 
const User = require('../models/UserModel')

const getUserByToken = async (token)=> {

    const secret = 'lkaiofjalaoirkajvnnauiaooi'
    const decoded = jwt.verify(token, secret)

    const user = await User.findOne({_id: decoded.id})

    return user

}

module.exports = getUserByToken