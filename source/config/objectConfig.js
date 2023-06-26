const {MongoSingleton}  = require('../utils/singleton')

require('dotenv').config()


module.exports={
    jwt_secret_key: process.env.JWT_SECRET_KEY,
    connectDb: async()=> await MongoSingleton.getInstance()
}