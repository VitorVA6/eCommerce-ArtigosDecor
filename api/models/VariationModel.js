const mongoose = require('mongoose') 
const {Schema} = mongoose 

const VariationSchema = new Schema({
    
    name: {
        type: String,
        required: true
    },
    options: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('Variation', VariationSchema)