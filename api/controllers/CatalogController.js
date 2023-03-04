const Catalog = require('../models/CatalogModel')
const User = require('../models/UserModel')
const getUserByToken = require('../utils/getUserByToken')

module.exports = class CatalogController{

    static async createFirst(){

        const catalog = await Catalog.find()
        
        if(catalog.length === 0){

            const user = await User.findOne()

            try{
                Catalog.create({
                    admin: user._id,
                    sobre: '',
                    telefone: '',
                    rsociais: {insta: '', face: '', yt: '', tt: ''},
                    nome: '',
                    whats: '',
                    email: ''
                })
            }catch(err){
                console.log(err)
            } 
        }

    }

    static async getSettings(req, res){

        try{
            const catalog = await Catalog.findOne()
            res.status(200).json(catalog)
        }catch(err){
            res.status(404).json({message: 'Catálogo não encontrado'})
        }        

    }

    static async updateCatalog(req, res){

        const {categorias, variacoes, sobre, rsociais, telefone, email, nome, whats, banners} = req.body

        const user = await getUserByToken(req.headers.authorization)
        
        if(!user){
            res.status(422).json({message: 'Você não tem autorização pra essa operação'})
        }

        const catalog = await Catalog.findOne()

        if(!catalog.admin.equals(user._id) ){
            res.status(422).json({message: 'Você não tem autorização pra essa operação'})
        }

        if(!!categorias){
            catalog.categorias = categorias
        }
        if(!!variacoes){
            catalog.variacoes = variacoes
        }
        if(!!sobre){
            catalog.sobre = sobre
        }
        if(!!rsociais){
            catalog.rsociais = rsociais
        }
        if(!!telefone){
            catalog.telefone = telefone
        }
        if(!!email){
            catalog.email = email
        }
        if(!!nome){
            catalog.nome = nome
        }
        if(!!whats){
            catalog.whats = whats
        }
        if(!!banners){
            catalog.banners = banners
        }

        try{

            await Catalog.findOneAndUpdate({admin: user._id}, catalog)
            res.status(200).json({message: 'Catálogo atualizado com sucesso!'})

        }catch(err){
            res.status(500).json(err)
        }

    }

}