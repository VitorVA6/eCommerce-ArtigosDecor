const mongoose = require('mongoose')
const {Schema} = mongoose 
const mongoosePaginate = require('mongoose-paginate-v2');

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
        type: [String],
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
        type: Array,
        required: true 
    },
    desc: String,
    variations: {
        type: Array
    },
    combinations: {
        type: Array
    }

})

ProductSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Product', ProductSchema)