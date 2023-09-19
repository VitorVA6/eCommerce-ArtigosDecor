const User = require('../models/UserModel')
const Catalog = require('../models/CatalogModel')
const Token = require('../models/TokenModel')
const bcrypt = require('bcrypt')
const createUserToken = require('../utils/createUserToken')
const getUserByToken = require('../utils/getUserByToken')
const sendEmail = require('../utils/sendEmail')
const templateVerifyEmail = require('../emailTemplates/templateVerifyEmail')
const crypto = require('crypto')
const templateSendOTP = require('../emailTemplates/templateSendOTP')

module.exports = class UserController{

    static async createFirst(){

        const user = await User.find()
        const catalog = await Catalog.find()
        if(user.length > 0) return
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash('admin', salt)

        try{
            const newUser = await User.create({
                name: 'admin',
                email: 'admin@admin.com',
                password: passwordHash
            })
            if(catalog.length === 0){
                await Catalog.create({
                    admin: newUser._id,
                    sobre: '',
                    telefone: '',
                    rsociais: {insta: '', face: '', yt: '', tt: ''},
                    nome: '',
                    whats: '',
                    email: '',
                    address: {
                        cep: '',
                        endereco: '',
                        numero: '',
                        bairro: '',
                        cidade: '',
                        estado: '',
                        complemento: ''
                    },
                    ship_option: 'BOTH',
                    shipFree: {
                        status: false,
                        minValue: 0,
                        validLocals: 'CITY'
                    },
                    shipCorreios: {
                        status: false,
                        sedex: false,
                        pacMyCity: false,
                        days: {
                            value: 1,
                            label: '1 dia'
                        }
                    },
                    shipCustom: {
                        status: false,
                        deliveryName: '',
                        cities: []
                    }
                })
            }else{
                await Catalog.deleteMany({})
                await Catalog.create({
                    admin: newUser._id,
                    sobre: '',
                    telefone: '',
                    rsociais: {insta: '', face: '', yt: '', tt: ''},
                    nome: '',
                    whats: '',
                    email: ''
                })
            }
        }catch(err){
            console.log(err)
        }
        
        

    }

    static async register( req, res ){
        
        const {name, email, password} = req.body
        
        if(!name){
            res.status(422).json({error: 'Nome é obrigatório'})
            return
        }
        if(!email){
            res.status(422).json({error: 'E-mail é obrigatório'})
            return
        }
        if(!password){
            res.status(422).json({error: 'Senha é obrigatória'})
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
            res.status(422).json({error: 'Ocorreu um erro na criação do usuário'})
        }
    }

    static async login( req, res ){
        const {email, password} = req.body
        if(!email){
            res.status(422).json({error: 'E-mail é obrigatório'})
            return
        }
        if(!password){
            res.status(422).json({error: 'Senha é obrigatória'})
            return
        }
        const user = await User.findOne({email: email})
        if (!user){
            res.status(422).json({error: 'E-mail não existe'})
            return
        }
        const checkPassword = await bcrypt.compare(password, user.password)
        if(!checkPassword){
            res.status(422).json({error: 'Senha inválida'})
            return
        }
        createUserToken(user, req, res)
    }

    static async getUser(req, res){
        const user = await getUserByToken(req.headers.authorization)
        if(!user){
            res.status(422).json({error: 'Você não tem autorização pra essa operação'})
        }
        user.password = undefined
        res.status(200).json(user)
    }

    static async sendEmailRecovery(req, res){
        const {email} = req.body
        if(!email) return res.status(400).json({error: 'E-mail não foi informado'})

        try{
            const user = await User.findOne({email: email})
            if(!user) return res.status(404).json({error: 'Este e-mail não está cadastrado'})
            if(!user.passwordResetToken.token || !user.passwordResetToken.expires || Date.now() > user.passwordResetToken.expires) {
                const resetToken = user.createResetPasswordToken()
                await user.save()
                const url = `${process.env.BASE_URL}users/reset-password/${resetToken}`
                try{
                    await sendEmail(email, "Verificação de e-mail", templateSendOTP(url, user.name))
                }
                catch(err){
                    user.passwordResetToken = {}
                    await user.save()
                    return res.status(500).json({error: 'Ocorreu um erro no envio do e-mail de verificação'})
                }
                return res.status(200).json({message: 'Código de verificação enviado, verifique seu e-mail'})
            }
            return res.status(400).json({error: 'Você já possui uma tentativa de recuperação de senha, tente novamente em alguns minutos'})
        }catch(err){
            
            return res.status(500).json({error: 'Ocorreu um erro no servidor, tente novamente mais tarde'})
        }
    }

    static async resetPassword(req, res){

    }

    static async updateUser(req, res){
        const user = await getUserByToken(req.headers.authorization)
        const {email, senhaAtual, novaSenha} = req.body
        if(!user){
            return res.status(422).json({error: 'Você não tem autorização pra essa operação'})
        }
        if(!!email){
            try{
                const token = await new Token({
                    userId: user._id,
                    token: crypto.randomBytes(32).toString("hex"),
                    email: email
                }).save()                
                const url = `${process.env.BASE_URL}users/verify/${token.token}`
                await sendEmail(email, "Verificação de e-mail", templateVerifyEmail(url, user.name))
                return res.status(200).json({message: 'Foi enviado um e-mail de confirmação para o endereço informado, verique-o'})
            }catch(err){
                await Token.findOneAndDelete({userId: user._id})
                return res.status(400).json({error: "Oops! Ocorreu um erro no envio do e-mail de verificação. Caso já tenha enviado uma solitação de alteração para esse e-mail, espere alguns minutos e tente novamente."})
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
                return res.status(422).json({error: 'Os dados que enviou são inválidos.'})
            }
        }
        try{
            await User.findOneAndUpdate({_id: user._id}, user)
            return res.status(200).json({message: 'Usuário atualizado'})
        }
        catch(err){
            return res.status(422).json({error: 'Não foi possível atualizar o usuário'})
        }
    }

    static async verify(req, res){
        const {token} = req.params
        try{
            const user = await getUserByToken(req.headers.authorization)
            if(!user){
                return res.status(400).json({error: 'Você não tem autorização pra essa operação.'})
            }

            const tokenEmail = await Token.findOne({
                userId: user._id,
                token: token
            })
            if(!tokenEmail){
                return res.status(400).json({error: 'Token inválido.'})
            }
            user.email = tokenEmail.email
            await User.findOneAndUpdate({_id: user._id}, user)
            await tokenEmail.remove()
            return res.status(200).json({message: 'Email atualizado'})
        }
        catch(err){
            return res.status(400).json({error: 'Ocorreu um erro na verificação de e-mail'})
        }
    }
}