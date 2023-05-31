const { Schema, model } = require('mongoose')

const ticketSchema = new Schema({
    type: Number,
    sellerId: String,
    buyer: {
        name: String,
        number: String
    },
    receiver: {
        name: String,
        number: String
    },
    product: String,
    message: String
})

module.exports = model('tickets', ticketSchema)