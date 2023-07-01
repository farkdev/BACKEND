const {Schema, model} = require('mongoose')

const collection = "ticket"

const ticketSchema = new Schema ({

    code: {
        type: String,
        required: true,
        unique: true
    },
    purchase_date:{
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    purchase: {
        type: String,
        required: true
    }

})

ticketSchema.index({code: 1}, {unique: true})


const ticketModel = model(collection, ticketSchema)

module.exports= { ticketModel }