
const {productDao, cartDao } = require("../dao/factory")


const userDaoMongo = require("../dao/mongo/user.mongo");
const cartMemory = require('../dao/fileSys/cartManager');
const ProductRepository = require("../repositories/product.repository");
const CartRepository = require("../repositories/cart.repository");

// const cartService = new CartManagerMongo()
// const cartService = new cartMemory()





const cartService = new CartRepository(new cartDao())
const productService = new ProductRepository(new productDao())
const userService = new userDaoMongo()


module.exports= {
    productService,
    cartService,
    userService
}