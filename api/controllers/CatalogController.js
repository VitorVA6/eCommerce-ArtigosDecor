const Catalog = require('../models/CatalogModel')
const User = require('../models/UserModel')
const getUserByToken = require('../utils/getUserByToken')
const uploadS3 = require('../utils/uploadS3')
const removeS3 = require('../utils/removeS3')

module.exports = class CatalogController{

    static async getSettings(req, res){
        try{
            const catalog = await Catalog.findOne()
            res.status(200).json(catalog)
        }catch(err){
            res.status(404).json({error: 'Catálogo não encontrado'})
        }        
    }

    static async updateCatalog(req, res){
        const {sobre, rsociais, telefone, email, nome, whats, uploadedImages, address, ship_option, shipFree} = req.body
        const user = await getUserByToken(req.headers.authorization)
        
        if(!user){
            return res.status(422).json({error: 'Você não tem autorização pra essa operação'})
        }

        const catalog = await Catalog.findOne()

        if(!catalog.admin.equals(user._id) ){
            return res.status(422).json({error: 'Você não tem autorização pra essa operação'})
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
        if(!!address){
            catalog.address = address
        }
        if(!!ship_option){
            catalog.ship_option = ship_option
        }
        if(!!shipFree){
            catalog.shipFree = shipFree
        }
        let filesName = []
        let aux_files = []
        if(!!req.files || (!!uploadedImages && uploadedImages.length > 0) ){
            catalog.bannerdt.forEach( elem => {
                if(!uploadedImages.includes(elem)){
                    filesName.push(elem)
                }
            })
            aux_files =  req.files?.length > 0 ? req.files.map(image => image.filename) : []
            catalog.bannerdt = aux_files.concat(uploadedImages)
        }
        try{
            if(filesName.length > 0){
                const files = filesName.map(img => ({Key: img}))
                await removeS3(files)
            }
            if(aux_files.length > 0){
                await uploadS3(req.files)
            }
            await Catalog.findOneAndUpdate({admin: user._id}, catalog)
            res.status(200).json({message: 'Catálogo atualizado com sucesso!', dados: catalog})
        }catch(err){
            console.log(err)
            return res.status(500).json({error: 'Erro na atualização do catálogo.'})
        }

    }

}