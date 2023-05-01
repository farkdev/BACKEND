const { connect } = require('mongoose')


let url = 'mongodb+srv://farkdev:coderhouse@cluster0.p2tsobu.mongodb.net/Store'

module.exports = {
    connectDB: ()=>{

        connect(url)
        console.log('base de datos conectada')
        
    }
}