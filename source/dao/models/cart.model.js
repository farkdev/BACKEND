const {Schema, model} = require('mongoose')


const  collection = 'carts'


const cartItemSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }

})

const cartSchema = new Schema({
    items: [cartItemSchema],
    total: {
        type: Number,
    }
})


const Cart = model(collection, cartSchema)


module.export = {
    Cart
}