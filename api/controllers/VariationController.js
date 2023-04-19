const Variation = require('../models/VariationModel')
const Product = require('../models/ProductModel')
const User = require('../models/UserModel')
const getUserByToken = require('../utils/getUserByToken')
const ObjectId = require('mongoose')

module.exports = class VariationController {

    static async create (req, res){
        const {name, options} = req.body

        if(!name){
            return res.status(422).json({error: 'Nome é obrigatório.'})
        }
        if(!options){
            return res.status(422).json({error: 'Opções é obrigatório.'})
        }

        try{

            const newVariation = Variation.create({
                name,
                options
            })
            return res.status(201).json({message: 'Variação criada com sucesso'})

        }catch(err){
            return res.status(500).json({error: 'Ocorreu um erro na criação da variação.'})
        }

    }

    static async getAll(req, res){

        try{
            const variations = await Variation.find()
            return res.status(200).json(variations)
        }catch(err){
            return res.status(500).json({error: 'Ocorreu um erro no servidor.'})
        }

    }

    static async getById(req, res){

        const id = req.params.id 

        if (!ObjectId.isValidObjectId(id)){
            return res.status(422).json({error: 'ID inválido'})   
        }

        const variation = await Variation.findOne({_id:id})

        if(!variation){
            return res.status(404).json({error: 'Variação não existe!'})
        }

        res.status(200).json(variation)

    }

    static async update(req, res){

        const {name, options} = req.body
        const id = req.params.id

        if (!ObjectId.isValidObjectId(id)){
            return res.status(422).json({error: 'ID inválido'})   
        }

        const variation = await Variation.findOne({_id:id})
      
        if(!variation){
            return res.status(404).json({error: 'Variação não existe!'})
        }

        if(!name){
            return res.status(422).json({error: 'Nome é obrigatório.'})
        }
        if(!options){
            return res.status(422).json({error: 'Opções é obrigatório.'})
        }

        variation.name = name
        variation.options = options

        try{
            await Variation.findOneAndUpdate({_id: id}, variation, {new: true})
            res.status(200).json({message: 'Variação atualizada com sucesso'})
        }
        catch(err){
            res.status(500).json({error: 'Ocorreu um erro na atualização da variação.'})
        }

    }

    static async remove(req, res){

        const id = req.params.id

        if (!ObjectId.isValidObjectId(id)){
            return res.status(422).json({error: 'ID inválido'})   
        }

        const variation = await Variation.findOne({_id:id})

        if(!variation){
            return res.status(404).json({error: 'Variação não existe!'})
        }

        try{
            await Variation.findOneAndDelete({_id: id})
            await Product.updateMany({}, { $pull: { variations: { idVariacao: id } } })
            
            res.status(200).json({message: 'Variação removida com sucesso!'})
        }catch(err){
            res.status(500).json({error: 'Ocorreu um erro na deleção da variação.'})
        }

    }

    static async removeOption (req, res){

        const id = req.params.id
        const {idOption} = req.body

        if (!ObjectId.isValidObjectId(id)){
            return res.status(422).json({error: 'ID inválido'})   
        }

        const variation = await Variation.findOne({_id:id})

        if(!variation){
            return res.status(404).json({error: 'Variação não existe!'})
        }

        const option = variation.options.find( el => el.value === idOption )

        if(!option){
            return res.status(404).json({error: 'Opção não existe!'})
        }

        try{
            await Product.updateMany({}, { $pull: { "variations.$[element].idOptions": { $eq:idOption  } } }, {arrayFilters: [ { "element.idVariacao": {$eq:id} } ]})
            
            res.status(200).json({message: 'Variação removida com sucesso!'})
        }catch(err){
            res.status(500).json({error: 'Ocorreu um erro na deleção da variação.'})
        }

    }

}