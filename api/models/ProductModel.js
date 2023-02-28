const mongoose = require('mongoose')
const {Schema} = mongoose 

const ProductSchema = new Schema({
    title: {
        type: String,
        unique: true,
        require: true
    },
    preco: {
        type: Number,
        require: true
    },
    img: {
        type: String,
        require: true
    },
    destaque: {
        type: Boolean,
        require: true
    },
    desconto: {
        type: Number,
        require: true
    },
    categoria: {
        type: String,
        require: true 
    },
    desc: String

})