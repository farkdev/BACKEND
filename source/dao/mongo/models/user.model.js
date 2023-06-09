const {Schema, model} = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')


const collection = 'usuarios'

const userSchema = new Schema({ 
    first_name: {
        type: String,
        index: true,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    date_of_birth: {
        type: Date,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: "carts"
    }
})





userSchema.plugin(mongoosePaginate)
const userModel = model(collection, userSchema)

module.exports = {
    userModel
}
