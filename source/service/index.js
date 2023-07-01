
//se traen las instancias de los DAOS

const CartManagerMongo = require("../dao/mongo/cart.mongo");
const productMongo = require("../dao/mongo/product.mongo");
const userDaoMongo = require("../dao/mongo/user.mongo");
const cartMemory = require('../dao/fileSys/cartManager')





// const cartService = new CartManagerMongo()
const cartService = new cartMemory()

const productService = new productMongo()

const userService = new userDaoMongo()


module.exports= {
    productService,
    cartService,
    userService
}