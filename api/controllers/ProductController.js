const Product = require('../models/ProductModel')
const Variation = require('../models/VariationModel')
const crypto = require('crypto')
const combine = require('../utils/combine')
const ObjectId = require('mongoose')
const fs = require('fs')
const uploadS3 = require('../utils/uploadS3')
const uploadS3files = require('../utils/uploadS3files')
const removeS3 = require('../utils/removeS3')
const generateXML = require('../utils/generateXML')
const axios = require('axios')
const imageReader = require('../utils/imageReader')

module.exports = class ProductController{

    static async create (req, res){

        const { title, preco, desconto, categoria, desc, combinations, variations } = req.body 
        const destaque = false

        if (!title){
            return res.status(422).json({error: 'Título é obrigatório'})
        }
        if (!preco){
            return res.status(422).json({error: 'Preço é obrigatório'})
        }
        
        if (!desconto){
            return res.status(422).json({error: 'Desconto é obrigatório'})
        }
        if (!categoria){
            return res.status(422).json({error: 'Categoria é obrigatório'})
        }
        if(!desc){
            return res.status(422).json({error: 'Descrição é obrigatório'})
        }
        if(!combinations){
            return res.status(422).json({error: 'Combinações é obrigatório'})
        }
        if(!variations){
            return res.status(422).json({error: 'Variações é obrigatório'})
        }
        if(req.files.length === 0){
            return res.status(422).json({error: 'Imagem é obrigatório'})
        }

        try{
            const images = await uploadS3(req.files)
            const newProduct = await Product.create({
                title, 
                preco,
                destaque,
                desconto,
                categoria: JSON.parse(categoria),
                combinations: JSON.parse(combinations),
                variations: JSON.parse(variations),
                desc,
                img: images
            })
            res.status(201).json({message: 'Produto criado com sucesso', newProduct})
        }catch(err){
            res.status(500).json({error: 'Ocorreu um erro na criação do produto.'})
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
                return res.status(404).json({error: 'Ocorreu um erro no servidor'})
            }
        }
        else{
            return res.status(500).json({error: 'Filtragem inválida'})
        } 
    }

    static async getAll(req, res){
        const page = parseInt(req.query.p, 10)  || 1
        const limit = parseInt(req.query.limit, 10)  || 8
        const category = req.query.category || 'all'
        const ordination = req.query.ordination || '0'
        var key = req.query.key || ''
        
        let filter = {}
        let order = {}

        if(category === 'lancamentos'){
            order = {
                createdAt: -1
            }
        }
        else if(category === 'destaques'){
            filter = {
                destaque: true
            }
        }
        else if(category === 'promocoes'){
            filter = {
                desconto: { $gt: 0 }
            }
        }
        else if(category !== 'all'){
            filter = { 'categoria.value': category }
        }
        if (key !== ''){
            var specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,."
            for (var i = 0; i < specialChars.length; i++) {
                key = key.replace(new RegExp("\\" + specialChars[i], "gi"), `\\${specialChars[i]}`);
            }            
            filter = { ...filter, "title": { "$regex": key, "$options": "i" }}           
        }
        if(ordination === '0'){
            order = {...order, destaque: -1}
        }
        else if(ordination === '1'){
            order = {...order, desconto: -1}
        }
        else if(ordination === '2'){
            order = {...order, title: 1}
        }
        else if(ordination === '3'){
            order = {...order, title: -1}
        }
        else if(ordination === '4'){
            order = {...order, preco: 1}
        }
        else if(ordination === '5'){
            order = {...order, preco: -1}
        }
        else if(ordination === '6'){
            order = {...order, createdAt: 1}
        }
        else if(ordination === '7'){
            order = {...order, createdAt: -1}
        }

        const options = {
            page: page,
            limit: limit,
            collation: {
                locale: 'pt',
            },
            sort: order
        }
        Product.paginate(filter, options, function(err, result){
            if (err){
                return res.status(404).json({error: 'Ocorreu um erro no servidor.'})
            }
            return res.status(200).json(result)
        })
    }

    static async getProductById(req, res) {

        const id = req.params.id 

        if (!ObjectId.isValidObjectId(id)){
            return res.status(422).json({error: 'ID inválido'})
            
        }

        const product = await Product.findOne({_id:id}) 

        if(!product){
            return res.status(404).json({error: 'Produto não existe!'})
        }

        res.status(200).json({product: product})

    }

    static async createByFile(req, res){

        const { products } = req.body

        if(!products) return res.status(400).json({error: 'A lista de produtos é obrigatória'})

        try{

            for (let i = 0; i < products.length; i++) {
    
                const files = await imageReader(products[i].urls)
        
                const images = await uploadS3files(files)
    
                await Product.create({
                    title: products[i].title, 
                    preco: products[i].price,
                    destaque: false,
                    desconto: 0,
                    categoria: [{
                        value: "651bf627f684be74b9a56d82",
                        label: "Painel de Led"
                    }],
                    combinations: [],
                    variations: [],
                    desc: products[i].desc,
                    img: images
                })
            }
    
    
            res.status(200).json({message: 'Produtos adicinados com sucesso'})
        }catch(err){
            console.log(err)
            res.status(500).json({message: 'Ocorreu um erro no cadastro de um dos produtos'})
        }

    }

    static async updateProduct(req, res){

        const { title, preco, desconto, categoria, desc, uploadedImages, combinations, variations } = req.body
        
        const id = req.params.id

        if (!ObjectId.isValidObjectId(id)){
            return res.status(422).json({error: 'ID inválido'})   
        }

        const product = await Product.findOne({_id:id}) 

        if(!product){
            return res.status(404).json({error: 'Produto não existe!'})
        }
        
        if (!title){
            return res.status(422).json({error: 'Título é obrigatório'})
        }
        product.title = title

        if (!preco){
            return res.status(422).json({error: 'Preço é obrigatório'})
        }
        product.preco = preco  
        
        if (!desconto){
            return res.status(422).json({error: 'Desconto é obrigatório'})
        }
        product.desconto = desconto

        if (!categoria){
            return res.status(422).json({error: 'Categoria é obrigatório'})
        }
        product.categoria = JSON.parse(categoria)

        if(!desc){
            return res.status(422).json({error: 'Descrição é obrigatório'})
        }
        product.desc = desc

        if(!combinations){
            return res.status(422).json({error: 'Combinações é obrigatório'})
        }
        product.combinations = JSON.parse(combinations)

        if(!variations){
            return res.status(422).json({error: 'Variações é obrigatório'})
        }
        product.variations = JSON.parse(variations)

        if(req.files?.length === 0 && uploadedImages?.length === 0){
            return res.status(422).json({error: 'Imagem é obrigatório'})
        }

        let filesName = []

        product.img.forEach( elem => {
            if(!uploadedImages.includes(elem)){
                filesName.push(elem)
            }
        })
        
        let aux_files =  req.files?.length > 0 ? req.files.map(image => image.filename) : []
        product.img = aux_files.concat(uploadedImages)

        try{
            if(filesName.length > 0){
                const files = filesName.map(img => ({Key: img}))
                await removeS3(files)
            }
            if(aux_files.length > 0){
                await uploadS3(req.files)
            }
            const updatedProd = await Product.findOneAndUpdate({_id: id}, product, {new: true})
            res.status(200).json({product: updatedProd})
        }
        catch(err){
            res.status(500).json({error: 'Ocorreu um erro na atualização do produto.'})
        }
    }

    static async deleteProduct(req, res){
        
        const id = req.params.id 

        if (!ObjectId.isValidObjectId(id)){
            return res.status(422).json({error: 'ID inválido'})   
        }

        const product = await Product.findOne({_id:id}) 

        if(!product){
            return res.status(404).json({error: 'Produto não existe!'})
        }

        try {
            const files = product.img.map(img => ({Key: img}))
            const deleted = await removeS3(files)
            await Product.findOneAndDelete({_id: id})
            
            res.status(200).json({message: 'Produto removido com sucesso!'})
        }
        catch(err){
            res.status(500).json({error: 'Ocorreu um erro na deleção do produto.'})
        }
    }

    static async favoriteProduct(req, res){

        const id = req.params.id 
        const { destaque } = req.body

        if (!ObjectId.isValidObjectId(id)){
            return res.status(422).json({error: 'ID inválido'})   
        }

        const product = await Product.findOne({_id:id})
        if(!product){
            return res.status(404).json({error: 'Produto não existe!'})
        }

        if(!req.body.hasOwnProperty('destaque')){
            return res.status(422).json({error: 'Dados não fornecidos!'})
        }
        product.destaque = destaque
        try{
            await Product.findOneAndUpdate({_id: id}, product)
            res.status(200).json({message: 'Produto destacado com sucesso!'})
        }catch(err){
            res.status(500).json({error: 'Ocorreu um erro na atualização do produto.'})
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
                return res.status(400).json({error: 'Id inválido'})
            }
    
            const cart = await Product.find({
                '_id': { $in: ids}
            })
    
            return res.status(200).json(cart)

        }else{
            return res.status(400).json({error: 'Id inválido'})
        }
        
    }

    static async selectOption(req, res){

        const id = req.params.id
        const idVar = req.body.var
        const idOption = req.body.option

        if (!ObjectId.isValidObjectId(id) || !ObjectId.isValidObjectId(idVar)){
            return res.status(422).json({error: 'ID inválido'})        
        }

        const product = await Product.findOne({_id:id})
        if(!product){
            return res.status(404).json({error: 'Produto não existe!'})
        }

        const variation = await Variation.findOne({_id:idVar}) 

        if(!variation){
            return res.status(422).json({error: 'Variação não existe'})
        }

        const option = variation.options.find( el => el.value === idOption )

        if(!option){
            return res.status(422).json({error: 'Opção é obrigatório'})
        }

        const variacao = product.variations.find(el => el.idVariacao === idVar)
        if(!variacao){
            product.variations = [ ...product.variations, {idVariacao: idVar, idOptions: [idOption]} ]
        }else{
            product.variations = product.variations.map( el =>{
                if(el.idVariacao === idVar){
                    if(el.idOptions.includes(idOption)){
                        return el
                    }
                    else{
                        return {idVariacao: idVar, idOptions: [...el.idOptions, idOption]}
                    }
                    
                }
                return el
            } )
        }
        const result = combine(product.variations.map( el => el.idOptions ))
        product.combinations = result.map( el => {
            return {
                id: crypto.randomBytes(16).toString("hex"),
                price: product.preco,
                priceoff: 0,
                combination: el.split(' ')
            }
        } )

        try{
            await Product.findOneAndUpdate({_id: id}, product)
            res.status(200).json({message: 'Produto atualizado com sucesso!'})
        }catch(err){
            res.status(500).json({error: 'Ocorreu um erro na atualização do produto.'})
        }

    }

    static async unSelectOption(req, res){
        
        const id = req.params.id
        const idVar = req.body.var
        const idOption = req.body.option

        if (!ObjectId.isValidObjectId(id) || !ObjectId.isValidObjectId(idVar)){
            return res.status(422).json({error: 'ID inválido'})        
        }

        try{
            await Product.updateOne(
                {_id:id, variations: { $elemMatch: {idVariacao: idVar }}},
                { $pull: { "variations.$.idOptions": { $eq:idOption  } } },
                {arrayFilters: [ { "element.idVariacao": {$eq:id} } ]}
            )

            res.status(200).json({message: 'Produto atualizado com sucesso!'})
        }catch(err){
            res.status(500).json({error: 'Ocorreu um erro na atualização do produto.'})
        }

    }

    static async xmlMaker(req, res){
        const products = await Product.find()
        const xmlData = generateXML(products);
        res.setHeader('Content-Type', 'text/xml');
        res.send(xmlData);
    }

}