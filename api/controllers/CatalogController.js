const Catalog = require('../models/CatalogModel')
const User = require('../models/UserModel')
const getUserByToken = require('../utils/getUserByToken')
const fs = require('fs')

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
            res.status(404).json({error: 'Catálogo não encontrado'})
        }        

    }

    static async updateCatalog(req, res){

        const {categorias, variacoes, sobre, rsociais, telefone, email, nome, whats, uploadedImages} = req.body

        const user = await getUserByToken(req.headers.authorization)
        
        if(!user){
            return res.status(422).json({error: 'Você não tem autorização pra essa operação'})
        }

        const catalog = await Catalog.findOne()

        if(!catalog.admin.equals(user._id) ){
            return res.status(422).json({error: 'Você não tem autorização pra essa operação'})
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
        if(!!req.files || !!uploadedImages ){
            
            catalog.bannerdt.forEach( elem => {
                if(!uploadedImages?.includes(elem)){
                    fs.stat(`./public/images/carrosel/${elem}`, function (err, stats) {
                        
                        if (err) {
                            return console.error(err);
                        }
                        
                        fs.unlink(`./public/images/carrosel/${elem}`,function(err){
                                if(err) return console.log(err);
                        });
                    });
                }
            } )
            
            
            let aux_files =  req.files?.length > 0 ? req.files.map(image => image.filename) : []
            catalog.bannerdt = aux_files.concat(uploadedImages)
            
        }

        try{

            await Catalog.findOneAndUpdate({admin: user._id}, catalog)
            res.status(200).json({message: 'Catálogo atualizado com sucesso!', dados: catalog})

        }catch(err){
            return res.status(500).json({error: 'Erro na atualização do catálogo.'})
        }

    }

}