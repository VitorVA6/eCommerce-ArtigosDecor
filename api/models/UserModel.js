const mongoose = require('mongoose') 
const {Schema} = mongoose 
const jwt = require('jsonwebtoken')

const UserSchema = new Schema({
    name: String,
    email: {type: String, unique: true},
    password: String,
    passwordResetToken: {
        expires: Date,
        token: String
    }
})

UserSchema.methods.createResetPasswordToken = function(){
    const resetToken = jwt.sign( {
        id: this._id
    }, process.env.JWT_SECRET, {expiresIn: '10m'} )
    
    this.passwordResetToken = {
        expires: Date.now() + 10*60*1000,
        token: resetToken
    }
    return resetToken
}

module.exports = mongoose.model('User', UserSchema)
