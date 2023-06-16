
//se traen las instancias de los DAOS

const CartManagerMongo = require("../dao/cart.mongo");
const productMongo = require("../dao/product.mongo");
const userDaoMongo = require("../dao/user.mongo");








const productService = new productMongo()
const cartService = new CartManagerMongo()
const userService = new userDaoMongo()


module.exports= {
    productService,
    cartService,
    userService
}