const { Schema, model } = require('mongoose')

const ticketSchema = new Schema(
    {
        type: Number,
        sellerId: String,
        paymentMethod: String,
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
    },
    {
        timestamps: true,
    }
)

module.exports = model('tickets', ticketSchema)