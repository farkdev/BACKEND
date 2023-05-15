const { Router } = require('express')
const router = Router()
const ProduMan = require('../dao/ProductManager2')
const { produc, productModel } = require('../dao/models/products.model')
const productMongo = require('../dao/product.mongo')
const productos = new ProduMan()

router.get('/', async (req, res) => {
  try{ 
    const {page=1, limit=5, sort=""} = req.query
    let sortOptions={}
    if (sort === 'asc') {

        sortOptions = { price: 1 };

    } else if (sort === 'desc') {

        sortOptions = { price: -1 };

    }
    const listPro = await productModel.paginate({}, {limit, page, sort, lean: true})
    const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages} = listPro
    res.render('home',{
      status: 'success',
      products: docs,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
      totalPages,
      title: "Productos"
    })
    
  } catch (error){
    console.log(error)
  }
})


// router.get('/', async (req, res)=>{
//   try {
//     const mongdbProducts = await productMongo.getProductsM({}, {lean: true})
//     const prodMongo = mongdbProducts.map(product => product.toObject())
//     const data = { productos: prodMongo}
//     res.render('home', data)
//   } catch (error){
//     console.error("Error al obtener productos desde MongoDB", error)
//     res.status(500).send("error en el servidor")
//    }
// })



// router.get('/', async (req, res)=>{
//   const Productlist = await productos.getProducts()
//   let datosProd = {
//     lista: Productlist
//   }
//   res.render('home', datosProd)
// })

router.get('/realtimeproducts', async(req, res) =>{
    
  const prodList =  await productos.getProducts()

  let datosProd = {
      listaProductosReal: prodList
  }
  res.render('realtimeproducts', datosProd)
})
























// router.get('/', async (req, res)=>{
//   res.render('index', {})

  
// })



// router.get('/', (request, response)=>{
//     let user = users[Math.floor(Math.random () * users.length)]
//     let testUser = {
//         title: 'Tienda',
//         user,
//         isAdmin: users.admin ==='si',
//     }


     
    
    
//     response.render('index', {
//         testUser,
//         style: 'index.css',
//         isAdmin: user.admin ==='si',
//         ropa
//     })
// })








// const users = [
//   {
//     id: 1,
//     name: "Juan",
//     email: "juan@gmail.com",
//     age: 25,
//     city: "Madrid",
//     country: "Spain",
//     admin: "si"
//   },
//   {
//     id: 2,
//     name: "María",
//     email: "maria@hotmail.com",
//     age: 30,
//     city: "Barcelona",
//     country: "Spain",
//     admin: "no"
//   },
//   {
//     id: 3,
//     name: "Pedro",
//     email: "pedro@yahoo.com",
//     age: 27,
//     city: "Valencia",
//     country: "Spain",
//     admin: "si"
//   }
// ];
// const ropa = [
//   { name: "Camiseta", price: 20.99 },
//   { name: "Pantalón", price: 35.99 },
//   { name: "Zapatos", price: 50.50 },
//   { name: "Gorra", price: 10.99 }
// ];



// router.get('/', async (req, res)=>{
//   try{
//     let users = await userModel.find()
//     console.log(users)
//     res.send("hello world")
//   }catch(error){
//     console.log(error)
//   }
// })






module.exports = router
