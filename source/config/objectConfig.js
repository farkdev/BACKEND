const { connect } = require('mongoose')
const { productModel } = require('../dao/models/products.model')
const dotenv = require('dotenv')
const { commander } = require('../utils/process/commander')
let url = process.env.MONGO_URL

const { mode } = commander.opts()



dotenv.config({
    path: mode === "development" ? './env.development': './env.production'
})


module.exports = {
    port: process.env.PORT,
    jwt_secret_key: process.env.JWT_SECRET_KEY,
    connectDB: async () => {
        try {
            connect(url)
            console.log('Base de datos conectada')             
        } catch (err) {
            console.log(err)
        } 
    }
}