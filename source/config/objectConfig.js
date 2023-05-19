const { connect } = require('mongoose')
const { productModel } = require('../dao/models/products.model')


let url = 'mongodb+srv://farkdev:coderhouse@cluster0.p2tsobu.mongodb.net/Store'

module.exports = {
    connectDB: async ()=>{
        console.log("base de datos conectada")
        connect(url)
       
    
        const filtro = await productModel.aggregate([
            {
                $match: {price: 1500}

            },
            {
                $group: {_id: '$title' ,totalStock: {$sum: "$stock"}}
            },
            {
                $sort: {totalStock: +1}
            }

        ])
        console.log(filtro)
    }
}