const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const createUserToken = require('../utils/createUserToken')

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

}