const mongoose = require('mongoose') 
const {Schema} = mongoose 

const PaymentSchema = new Schema({
    name: String,
    subtotal: Number,
    delivery_rate: Number,
    transaction_amount: Number,
    products: Array,
    whats: String,
    email: String,
    cpf: String,
    endereco: String,
    cep: String,
    payment_type_id: String,
    status: String,
    payment_id: String
})

module.exports = mongoose.model('Payment', PaymentSchema)