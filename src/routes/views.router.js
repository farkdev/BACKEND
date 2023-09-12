const { Router } = require('express')
const router = Router()
const { passportCall } = require('../config/passportCall')
const { authorization } = require('../config/passportAuthorization')
const ViewsController = require('../controllers/view.controller');
const { productModel } = require('../dao/mongo/models/products.model')
const ProductManagerMongo = require('../dao/mongo/product.mongo');



//vista inicial de productos
router.get('/', ViewsController.getProducts)

router.get('/carts/:cid', ViewsController.getCartById)

router.get('/realTimeProducts',passportCall('current', {session: false}),authorization(['admin', 'premium']), ViewsController.getRealTimeProducts)

router.get('/api/session/login', (req,res)=>{
  res.render('login',{})
})

router.get('/api/session/register', (req,res)=>{
  res.render('registerForm',{})
})

router.get('/api/session/forgotPassword', (req,res)=>{
  res.render('forgotPassw',{})
})

router.get('/api/session/resetPassword', ViewsController.resetPasswordpage)

router.get('/api/session/documents', (req,res) =>{
  res.render('uploadDocuments',{})
})

router.get('/api/session/usersPanel', passportCall('current', {session: false}), authorization(['admin']), ViewsController.usersControlPanel)

router.get('/chat', passportCall('current', {session: false}), authorization('user') , (req, res)=>{
  res.render('chat', {})
})






module.exports = router
