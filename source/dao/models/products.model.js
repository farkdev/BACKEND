const {Schema, model} = require('mongoose')


const collection = 'Products'

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnail: String,
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    }

})

const productModel = model(collection, productSchema)


module.exports = {
    productModel
}