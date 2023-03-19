const User = require('../models/UserModel')
const Token = require('../models/TokenModel')
const bcrypt = require('bcrypt')
const createUserToken = require('../utils/createUserToken')
const getUserByToken = require('../utils/getUserByToken')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')

module.exports = class UserController{

    static async register( req, res ){
        
        const {name, email, password} = req.body
        
        if(!name){
            res.status(422).json({message: 'Nome é obrigatório'})
            return
        }
        if(!email){
            res.status(422).json({message: 'E-mail é obrigatório'})
            return
        }
        if(!password){
            res.status(422).json({message: 'Senha é obrigatória'})
            return
        }

        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt) 

        try {
            const newUser = await User.create({
                name,
                email,
                password: passwordHash
            })
            res.status(201).json({message: 'Usuário criado com sucesso', newUser})
        }catch(err){
            res.status(422).json({message: err})
        }
    }

    static async login( req, res ){

        const {email, password} = req.body

        if(!email){
            res.status(422).json({error: 'E-mail é obrigatório'})
            return
        }
        if(!password){
            res.status(422).json('Senha é obrigatória')
            return
        }
        
        const user = await User.findOne({email: email})

        if (!user){
            res.status(422).json({message: 'E-mail não existe'})
            return
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if(!checkPassword){
            res.status(422).json({message: 'Senha inválida'})
            return
        }

        createUserToken(user, req, res)

    }

    static async getUser(req, res){

        const user = await getUserByToken(req.headers.authorization)

        if(!user){
            res.status(422).json({message: 'Você não tem autorização pra essa operação'})
        }

        user.password = undefined

        res.status(200).json(user)

    }

    static async updateUser(req, res){

        const user = await getUserByToken(req.headers.authorization)

        const {email, senhaAtual, novaSenha} = req.body

        if(!user){
            return res.status(422).json({message: 'Você não tem autorização pra essa operação'})
        }

        

        if(!!email){
            try{
                const token = await new Token({
                    userId: user._id,
                    token: crypto.randomBytes(32).toString("hex"),
                    email: email
                }).save()                
    
                const url = `${process.env.BASE_URL}users/verify/${token.token}`
                await sendEmail(email, "Verificação de e-mail", `<h2>Você está quase lá, clique no link para verificar seu e-mail</h2><a href="${url}" target="_blank">Clique aqui</a>`, res, user)
                return res.status(200).json({message: 'E-mail enviado, verique-o.'})
            }catch(err){
                return res.status(400).json({message: "Ocorreu um erro no envio do e-mail de verificação."})
            }
            
        }

        if(!!senhaAtual && !!novaSenha){
            const checkPassword = await bcrypt.compare(senhaAtual, user.password)
            console.log(checkPassword)
            if(checkPassword && novaSenha.length > 5){
                const salt = await bcrypt.genSalt(12)
                const novaSenhaHash = await bcrypt.hash(novaSenha, salt) 
                user.password = novaSenhaHash
            }
            else{
                return res.status(422).json({message: 'Os dados que enviou são inválidos.'})
            }
        }

        try{
            await User.findOneAndUpdate({_id: user._id}, user)
            return res.status(200).json({message: 'Usuário atualizado'})
        }
        catch(err){
            return res.status(422).json({message: 'Não foi possível atualizar o usuário'})
        }

    }

    static async verify(req, res){

        const {token} = req.params
        try{
            const user = await getUserByToken(req.headers.authorization)
            if(!user){
                return res.status(400).json({message: 'Você não tem autorização pra essa operação.'})
            }

            const tokenEmail = await Token.findOne({
                userId: user._id,
                token: token
            })
            if(!tokenEmail){
                return res.status(400).json({message: 'Token inválido.'})
            }
            user.email = tokenEmail.email
            await User.findOneAndUpdate({_id: user._id}, user)
            await tokenEmail.remove()
            return res.status(200).json({message: 'Email atualizado'})
        }
        catch(err){
            return res.status(400).json(err)
        }

    }

}