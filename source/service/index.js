
const { productDao, cartDao } = require("../dao/factory")


const userDaoMongo = require("../dao/mongo/user.mongo");
const cartMemory = require('../dao/fileSys/cartManager');
const ProductRepo = require("../repositories/product.repository");
const CartRepo = require("../repositories/cart.repository");

// const cartService = new CartManagerMongo()
// const cartService = new cartMemory()





const cartService = new CartRepo(new cartDao())
const productService = new ProductRepo(new productDao())
const userService = new userDaoMongo()


module.exports= {
    productService,
    cartService,
    userService
}