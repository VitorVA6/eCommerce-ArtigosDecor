const mongoose = require('mongoose')
const {Schema} = mongoose 

const ProductSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    preco: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    destaque: {
        type: Boolean,
        required: true
    },
    desconto: {
        type: Number,
        required: true
    },
    categoria: {
        type: [String],
        required: true 
    },
    desc: String

})

module.exports = mongoose.model('Product', ProductSchema)