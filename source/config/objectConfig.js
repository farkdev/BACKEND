const { connect } = require('mongoose')
const { productModel } = require('../dao/models/products.model')
const dotenv = require('dotenv')
const { commander } = require('../utils/process/commander')



const { mode } = commander.opts()

const environment = "production"

dotenv.config({
    path: environment === "development" ? './env.development': './env.production'
})


module.exports = {
    port: process.env.PORT,
    jwt_secret_key: process.env.JWT_SECRET_KEY,
    connectDB: async () => {
        try {
            connect(process.env.MONGO_URL)
            console.log('Base de datos conectada')             
        } catch (err) {
            console.log(err)
        } 
    }
}
