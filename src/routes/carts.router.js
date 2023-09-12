const { Router } = require('express')
const CartManagerMongo = require('../dao/mongo/cart.mongo');
const cartController = require('../controllers/cart.controller');
const { passportCall } = require('../config/passportCall')
const { authorization } = require('../config/passportAuthorization')

const router = Router()
const cartManager = new CartManagerMongo


// crea carrito
router.post('/cart', cartController.createCart);

//GET CARRITOS
router.get('/', cartController.getCarts)

//CARRITOS POR ID
router.get('/:cid', cartController.getCartById)

//AGREGA PRODUCTOS AL CARRITO
router.post('/:cid/products/:pid', passportCall('current', {session: false}), authorization(['user','premium','admin']), cartController.addToCart)

//PUT MODIFICA PRODUCTOS DEL CARRITO
router.put('/:cid/products/:pid', cartController.modifyProdFromCart)

//MODIFICA CARRITO COMPLETO
// router.put('/:cid', cartController.modifyCart)

//DELETE 1 PRODUCTO DEL CART
router.delete('/:cid/products/:pid', cartController.removeProductFromCart)

//BORRA CARRITO
router.delete('/:cid', cartController.cartDelete)

//EMITE TICKET DE COMPRA
router.post('/:cid/purchase', passportCall('current', {session: false}), authorization(['user','premium','admin']), cartController.purchaseCart )



module.exports = router