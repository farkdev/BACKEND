const { Router } = require('express')
const router = Router()
const productsRouter = require('./products.router')
const cartRouter = require('./carts.router.js')
const viewsRouter = require('./views.router')
const prueba = require('./prueba.router')
const users = require('./user.router')
const { logger } = require('../config/logger')





router.use('/api/products', productsRouter)
router.use('/api/carts', cartRouter)
router.use('/api/session', users)
router.use('/', viewsRouter)
router.use('/realtimeproducts', viewsRouter)
router.use('/prueba', prueba)

module.exports = router