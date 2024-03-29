const {Schema, model} = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const collection = 'products'

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnail: [String],
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
productSchema.plugin(mongoosePaginate)
const ProductModel = model(collection, productSchema)


module.exports = {
    ProductModel
}