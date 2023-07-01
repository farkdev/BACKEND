const config = require('../config/objectConfig')

let productDao
let cartDao

switch (config.persistence) {
    case 'MONGO':
        config.connectDB()
        const productDaoMongo = require('../dao/mongo/product.mongo')
        const cartDaoMongo = require('../dao/mongo/cart.mongo')

        cartDao = cartDaoMongo
        productDao = productDaoMongo

        break


    case 'FILE':
        const productFile = require('../dao/fileSys/ProductManager2')
        const cartFile = require('../dao/fileSys/cartManager')

        cartDao = cartFile
        productDao = productFile

        break 
}



module.exports = {
    productDao,
    cartDao
}