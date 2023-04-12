const mongoose = require('mongoose') 
const { Schema } = mongoose

const CatalogSchema = new Schema({

    admin: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    sobre: String,
    rsociais: Object,
    telefone: String,
    email: String,
    nome: String,
    whats: String,
    bannerdt: [String],
})

module.exports = mongoose.model('Catalog', CatalogSchema)