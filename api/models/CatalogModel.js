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
    },
    shipCorreios: {
        status: Boolean,
        sedex: Boolean,
        pacMyCity: Boolean,
        days: {
            value: Number,
            label: String
        }
    },
    shipCustom: {
        status: Boolean,
        deliveryName: String,
        cities: [
            {
                price: Number,
                city: {
                    value: String,
                    label: String
                }
            }
        ]
    }
})

module.exports = mongoose.model('Catalog', CatalogSchema)