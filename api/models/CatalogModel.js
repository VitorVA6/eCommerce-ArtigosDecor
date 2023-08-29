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
    address: {
        cep: { type: String },
        bairro: { type: String },
        cidade: { type: String },
        endereco: { type: String },
        numero: { type: String },
        estado: { type: String },
        complemento: { type: String }
    },
    ship_option: String,
    shipFree: {
        status: Boolean,
        minValue: Number,
        validLocals: String
    }
})

module.exports = mongoose.model('Catalog', CatalogSchema)