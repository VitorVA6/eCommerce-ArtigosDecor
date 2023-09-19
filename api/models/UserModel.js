const mongoose = require('mongoose') 
const {Schema} = mongoose 
const crypto = require('crypto')

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
    const resetToken = crypto.randomBytes(32).toString("hex")
    
    this.passwordResetToken = {
        expires: Date.now() + 10*60*1000,
        token: resetToken
    }
    return resetToken
}

module.exports = mongoose.model('User', UserSchema)
