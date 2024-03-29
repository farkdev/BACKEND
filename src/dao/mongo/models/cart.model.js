const {Schema, model} = require('mongoose')


const  collection = 'carts'


const cartSchema = new Schema({
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'products',
        },
        quantity: {
            type: Number,
            required: true
        },
        _id: false
    }]
})

cartSchema.pre('findOne', function(){
    this.populate('products.product')
})

const CartModel = model(collection, cartSchema)


module.exports = {
    CartModel
}