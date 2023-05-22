const { Router } = require('express')
const router = Router()
const { productModel } = require('../dao/models/products.model')
const ProductManagerMongo = require('../dao/product.mongo')
const productsManager = new ProductManagerMongo;

router.get('/', async (req, res) => {
  try {
    const result = await productsManager.getProductsM();
    let user = req.session.user
    res.render('home', {
      title: "Lista de Productos",
      payload: result,
      user
    });
  } catch (err) {
    console.log(err);
    res.render('error', { status: 'error', error: 'Ocurrió un error en la página' });
  }
});



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

//PROBANDO QUE MANERA FUNCIONA
// router.get('/products', async (req, res) => {
//   try{ 
//     const {page=1, limit=4, sort="asc"} = req.query
//     let sortOptions={}
//     if (sort === 'asc') {
//         sortOptions = { price: 1 };
//     } else if (sort === 'desc') {
//         sortOptions = { price: -1 };
//     }
//     const listPro = await productModel.paginate({}, {limit, page, sort, lean: true})
//     const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages} = listPro
//     const prevLink = hasPrevPage ? `/products/?page=${prevPage}` : '/';
//     const nextLink = hasNextPage ? `/products/?page=${nextPage}` : '/';
//     res.render('products',{
//       status: 'success',
//       products: docs,
//       hasPrevPage,
//       hasNextPage,
//       nextPage,
//       prevPage,
//       prevLink,
//       nextLink,
//       totalPages,
//       listPro,
//       title: "Productos"
//     })
//   } catch (error){
//     console.log(error)
//   }
// })




router.get('/realtimeproducts', async(req, res) =>{
    
  const prodList =  await productos.getProducts()

  let datosProd = {
      listaProductosReal: prodList
  }
  res.render('realtimeproducts', datosProd)
})


router.get('/login', async (req, res) =>{
  res.render('login', {})
})


router.get('/register', async (req,res)=>{
  res.render("registerForm", {})
})















module.exports = router
