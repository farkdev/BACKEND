const {MongoSingleton} = require('../utils/singleton')

const dotenv = require('dotenv')
const { program } = require('../utils/process/commander')
const { mode } = program.opts

dotenv.config({
    path: mode === 'development' ? '.env.development' : '.env.production'
})






module.exports={
    persistence: process.env.PERSISTENCE,
    jwt_secret_key: process.env.JWT_SECRET_KEY,
    connectDB: async()=> await MongoSingleton.getInstance()
}