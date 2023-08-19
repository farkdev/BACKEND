const { Router } = require('express')
const router = Router()
const { productModel } = require('../dao/mongo/models/products.model')
const ProductManagerMongo = require('../dao/mongo/product.mongo');
const viewController = require('../controllers/view.controller');
const productsManager = new ProductManagerMongo;




//vista inicial de productos
router.get('/', viewController.getProducts)


//VISTA PRODUCTOS PARA AGREGAR A CARRITO
router.get('/products', async(req,res)=>{
  try{
      const {limit = 4}= req.query
      const{page=1} = req.query
      const { sort } = req.query;
      let sortOptions={}

      if (sort === 'asc') {
          sortOptions = { price: 1 };
      } else if (sort === 'desc') {
          sortOptions = { price: -1 };
      }
      
      let { 
          docs, 
          totalPages,
          prevPage, 
          nextPage,
          hasPrevPage, 
          hasNextPage 
      } = await productModel.paginate({},{limit: limit , page: page, sort: sortOptions,lean: true})

      !hasPrevPage
      ? prevLink = null
      : prevLink =`/products?page=${prevPage}&limit=${limit}&sort=${sort}`

      !hasNextPage 
      ?nextLink = null
      :nextLink =`/products?page=${nextPage}&limit=${limit}&sort=${sort}`
      res.render('products',{
          status: 'success',
          payload: docs,
          totalPages,
          prevPage,
          nextPage,
          page,
          hasPrevPage,
          hasNextPage,
          prevLink,
          nextLink
      })
  }catch(err){
      console.log(err)
  }
})


router.get('/realTimeProducts',passportCall('current', {session: false}),authorization(['admin', 'premium']), viewsController.getRealTimeProducts)


router.get('/api/session/login', (req,res)=>{
  res.render('login',{})
})

router.get('/api/session/register', (req,res)=>{
  res.render('registerForm',{})
})

router.get('/api/session/forgotPassword', (req,res)=>{
  res.render('forgotPassword',{})
})

router.get('/api/session/resetPassword', viewController.resetPasswordpage)

router.get('/api/session/documents', (req,res) =>{
  res.render('uploadDocuments',{})
})











module.exports = router
