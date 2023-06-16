
//se traen las instancias de los DAOS

const CartManagerMongo = require("../dao/cart.mongo");
const productMongo = require("../dao/product.mongo");

const productService = new productMongo()
const cartService = new CartManagerMongo()



module.exports= {
    productService,
    cartService
}