const { Router } = require('express')
const router = Router()
const productsRouter = require('./products.router')
const cartRouter = require('./carts.router.js')
const viewsRouter = require('./views.router')
const cookie = require('./prueba.router')
const users = require('./user.router')





router.use('/api/products', productsRouter)
router.use('/api/carts', cartRouter)
router.use('/', viewsRouter, users)
// router.use('/api/session', users)
router.use('/realtimeproducts', viewsRouter)
// router.use('/prueba')

module.exports = router