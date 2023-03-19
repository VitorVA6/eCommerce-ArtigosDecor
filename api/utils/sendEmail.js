const nodemailer = require('nodemailer') 
const Token = require('../models/TokenModel')

module.exports = async(email, subject, text, res, user) => {

    try{
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            secure: false,
            auth:{
                user: process.env.USER,
                pass: process.env.PASS
            }
        })
        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            html: text
        })
        console.log('Email enviado com sucesso')
    }catch(err){
        await Token.findOneAndDelete({userId: user._id})
        console.log(err)
        throw new Error("Email não foi enviado")
    }

}