const Product = require('../models/ProductModel')
const ObjectId = require('mongoose')
const fs = require('fs')

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
        if(req.files.length === 0){
            return res.status(422).json({message: 'Imagem é obrigatório'})
        }

        const images = req.files.map( image => image.filename )

        try{
            const newProduct = await Product.create({
                title, 
                preco,
                destaque,
                desconto,
                categoria: categoria.split(','),
                desc,
                img: images
            })
            res.status(201).json({message: 'Produto criado com sucesso', newProduct})
        }catch(err){
            console.log(err)
            res.status(500).json({message: err})
        }

    } 

    static async getAll(req, res){

        const page = parseInt(req.query.p, 10)  || 1
        const limit = parseInt(req.query.limit, 10)  || 5
        const category = req.query.category || 'all'
        const highlight = req.query.highlight || 'false'

        let filter = {}

        if(category !== 'all')
            filter = { ...filter, categoria: category 
        }

        if(highlight === 'true' ){
            filter = {...filter, destaque: true}
        }

        const options = {
            page: page,
            limit: limit,
            collation: {
                locale: 'pt',
            },
            sort: {
                destaque: -1,
                title: 1
            }
        }

        Product.paginate(filter, options, function(err, result){
            if (err){
                return res(404).json(err)
            }
            return res.status(200).json(result)
        })

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

        const { title, preco, desconto, categoria, desc, uploadedImages } = req.body
        
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

        if(req.files.length === 0 && uploadedImages.length === 0){
            return res.status(422).json({message: 'Imagem é obrigatório'})
        }

        product.img.forEach( elem => {
            if(!uploadedImages.includes(elem)){
                fs.stat(`./public/images/products/${elem}`, function (err, stats) {
                 
                    if (err) {
                        return console.error(err);
                    }
                 
                    fs.unlink(`./public/images/products/${elem}`,function(err){
                         if(err) return console.log(err);
                    });
                 });
            }
        } )
        
        product.img = uploadedImages.concat(req.files.map(image => image.filename)) 

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

    static async filter(req, res){

        var {key} = req.query

        if (!!key){

            var specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,."
    
            for (var i = 0; i < specialChars.length; i++) {
                key = key.replace(new RegExp("\\" + specialChars[i], "gi"), `\\${specialChars[i]}`);
            }

            try{
                const result = await Product.find({ "title": { "$regex": key, "$options": "i" }})
                return res.status(200).json(result)
            }catch(err){
                return res.status(404).json(err)
            }

        }
        else{
            return res.status(500).json({message: 'Filtragem inválida'})
        } 
    }

    static async getCart(req, res){

        let {id} = req.query

        if(!!id){

            if(typeof(id) === 'string'){
                id = [id]
            }

            const ids = id.flatMap( element => {

                if(ObjectId.isValidObjectId(element)){
                    return ObjectId.Types.ObjectId(element)
                }
                else{
                    return []
                }
                
            } )

            if(ids.length === 0){
                return res.status(400).json({message: 'Id inválido'})
            }
    
            const cart = await Product.find({
                '_id': { $in: ids}
            })
    
            return res.json(cart)

        }else{
            return res.status(400).json({message: 'Id inválido'})
        }
        
        

    }

}