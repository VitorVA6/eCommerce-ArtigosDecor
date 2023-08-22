const Category = require('../models/CategoryModel')
const fs = require('fs')
const ObjectId = require('mongoose')
const uploadS3 = require('../utils/uploadS3')
const removeSingleS3 = require('../utils/removeSingleS3')

module.exports = class CategoryController {

    static async create (req, res){
        const {name} = req.body

        if(!name){
            return res.status(422).json({error: 'Nome é obrigatório.'})
        }
        if(!req.file){
            return res.status(422).json({error: 'Imagem é obrigatório'})
        }

        try{
            const image = await uploadS3([req.file])
            await Category.create({
                name,
                image: image[0]
            })
            return res.status(201).json({message: 'Categoria criada com sucesso'})
        }catch(err){
            return res.status(500).json({error: 'Ocorreu um erro na criação da categoria.'})
        }
    }

    static async getAll(req, res){

        try{
            const categories = await Category.find()
            return res.status(200).json(categories)
        }catch(err){
            return res.status(500).json({error: 'Ocorreu um erro no servidor.'})
        }

    }

    static async getById(req, res){
        const id = req.params.id 

        if (!ObjectId.isValidObjectId(id)){
            return res.status(422).json({error: 'ID inválido'})   
        }

        const category = await Category.findOne({_id:id})

        if(!category){
            return res.status(404).json({error: 'Categoria não existe!'})
        }

        res.status(200).json(category)
    }

    static async update(req, res){
        const {name, uploadedImages} = req.body

        const id = req.params.id
        if (!ObjectId.isValidObjectId(id)){
            return res.status(422).json({error: 'ID inválido'})   
        }

        const category = await Category.findOne({_id:id})
        const imageDelete = category.image
        if(!category){
            return res.status(404).json({error: 'Categoria não existe!'})
        }

        if(!name){
            return res.status(422).json({error: 'Nome é obrigatório.'})
        }

        if(!req.file && uploadedImages?.length === 0){
            return res.status(422).json({error: 'Imagem é obrigatório'})
        }
        let toDelete = false
        if(!uploadedImages || uploadedImages?.length === 0){
            toDelete = true
        }
        
        let auxFile = !!req.file ? req.file.filename : ''
        auxFile = auxFile === '' ? uploadedImages[0] : auxFile
        category.image = auxFile
        category.name = name

        try{
            if(toDelete === true){
                await removeSingleS3(imageDelete)
            }
            if(!!req.file){
                await uploadS3([req.file])
            }
            await Category.findOneAndUpdate({_id: id}, category, {new: true})
            res.status(200).json({message: 'Categoria atualizada com sucesso'})
        }
        catch(err){
            res.status(500).json({error: 'Ocorreu um erro na atualização da categoria.'})
        }

    }

    static async remove(req, res){

        const id = req.params.id

        if (!ObjectId.isValidObjectId(id)){
            return res.status(422).json({error: 'ID inválido'})   
        }

        const category = await Category.findOne({_id:id})

        if(!category){
            return res.status(404).json({error: 'Categoria não existe!'})
        }

        try{
            await removeSingleS3(category.image)
            await Category.findOneAndDelete({_id: id})

            res.status(200).json({message: 'Categoria removida com sucesso!'})
        }catch(err){
            res.status(500).json({error: 'Ocorreu um erro na deleção da categoria.'})
        }

    }

}
