const { Router } = require('express')
const router = Router()
const productsRouter = require('./products.router')
const cartRouter = require('./carts.router.js')
const viewsRouter = require('./views.router')






router.use('/api/products', productsRouter)
router.use('/api/carts', cartRouter)
router.use('/', viewsRouter)
router.use('/realtimeproducts', viewsRouter)


module.exports = router