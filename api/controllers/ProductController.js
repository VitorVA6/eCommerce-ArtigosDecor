const Product = require('../models/UserModel')

module.exports = class ProductController{

    static async create (req, res){

        
        res.status(200).json({message: 'Rota está ok'})

    } 

}