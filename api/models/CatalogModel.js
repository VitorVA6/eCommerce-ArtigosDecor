const mongoose = require('mongoose') 
const { Schema } = mongoose

const CatalogSchema = new Schema({

    admin: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    categorias: [String],
    variacoes: [Object],
    sobre: String,
    rsociais: Object,
    telefone: String,
    email: String,
    nome: String,
    whats: String,
    banners: [String],

})

module.exports = mongoose.model('Catalog', CatalogSchema)