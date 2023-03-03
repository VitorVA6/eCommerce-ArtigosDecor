const Product = require('../models/ProductModel')

const ObjectId = require('mongoose')
const { findOneAndUpdate } = require('../models/ProductModel')

module.exports = class ProductController{

    static async create (req, res){

        const { title, preco, desconto, categoria, desc } = req.body 
        const destaque = false

        if (!title){
            return res.status(422).json({message: 'Título é obrigatório'})
        }
        if (!preco){
            return res.status(422).json({message: 'Preço é obrigatório'})
        }
        
        if (!desconto){
            return res.status(422).json({message: 'Desconto é obrigatório'})
        }
        if (!categoria){
            return res.status(422).json({message: 'Categoria é obrigatório'})
        }
        if(!desc){
            return res.status(422).json({message: 'Descrição é obrigatório'})
        }
        if(!req.file){
            return res.status(422).json({message: 'Imagem é obrigatório'})
        }

        try{
            const newProduct = await Product.create({
                title, 
                preco,
                destaque,
                desconto,
                categoria: categoria.split(','),
                desc,
                img: req.file.filename
            })
            res.status(201).json({message: 'Produto criado com sucesso', newProduct})
        }catch(err){
            console.log(err)
            res.status(500).json({message: err})
        }

    } 

    static async getAll(req, res){

        const products = await Product.find().sort('-destaque')
        res.status(200).json({products: products})

    }

    static async getProductById(req, res) {

        const id = req.params.id 

        if (!ObjectId.isValidObjectId(id)){
            return res.status(422).json({message: 'ID inválido'})
            
        }

        const product = await Product.findOne({_id:id}) 

        if(!product){
            return res.status(404).json({message: 'Produto não existe!'})
        }

        res.status(200).json({product: product})

    }

    static async updateProduct(req, res){

        const { title, preco, desconto, categoria, desc } = req.body
        
        const id = req.params.id 

        if (!ObjectId.isValidObjectId(id)){
            return res.status(422).json({message: 'ID inválido'})   
        }

        const product = await Product.findOne({_id:id}) 

        if(!product){
            return res.status(404).json({message: 'Produto não existe!'})
        }
        
        if (!title){
            return res.status(422).json({message: 'Título é obrigatório'})
        }
        product.title = title

        if (!preco){
            return res.status(422).json({message: 'Preço é obrigatório'})
        }
        product.preco = preco  
        
        if (!desconto){
            return res.status(422).json({message: 'Desconto é obrigatório'})
        }
        product.desconto = desconto

        if (!categoria){
            return res.status(422).json({message: 'Categoria é obrigatório'})
        }
        product.categoria = categoria.split(',')

        if(!desc){
            return res.status(422).json({message: 'Descrição é obrigatório'})
        }
        product.desc = desc

        if(!req.file){
            return res.status(422).json({message: 'Imagem é obrigatório'})
        }
        product.img = req.file.filename

        try{
            const updatedProd = await Product.findOneAndUpdate({_id: id}, product, {new: true})
            res.status(200).json({product: updatedProd})
        }
        catch(err){
            res.status(500).json(err)
        }
    }

    static async deleteProduct(req, res){
        
        const id = req.params.id 

        if (!ObjectId.isValidObjectId(id)){
            return res.status(422).json({message: 'ID inválido'})   
        }

        const product = await Product.findOne({_id:id}) 

        if(!product){
            return res.status(404).json({message: 'Produto não existe!'})
        }

        try {
            await Product.findOneAndDelete({_id: id})
            res.status(200).json({message: 'Produto removido com sucesso!'})
        }
        catch(err){
            res.status(500).json(err)
        }
    }

    static async favoriteProduct(req, res){

        const id = req.params.id 
        const { destaque } = req.body

        if (!ObjectId.isValidObjectId(id)){
            return res.status(422).json({message: 'ID inválido'})   
        }

        const product = await Product.findOne({_id:id})
        if(!product){
            return res.status(404).json({message: 'Produto não existe!'})
        }

        if(!req.body.hasOwnProperty('destaque')){
            return res.status(422).json({message: 'Dados não fornecidos!'})
        }
        product.destaque = destaque
        try{
            await Product.findOneAndUpdate({_id: id}, product)
            res.status(200).json({message: 'Produto destacado com sucesso!'})
        }catch(err){
            res.status(500).json(err)
        }

    }

}