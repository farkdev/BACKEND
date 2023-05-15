const { Router } = require('express')
const ProductManager  = require('../dao/ProductManager2');
const CartManager = require('../dao/cartManager')
const router = require('./products.router');
const CartManagerMongo = require('../dao/cart.mongo');
const ProductM = new ProductManager()
const CartMan = new CartManager('./cart.json')
const {CartModel} = require('../dao/models/cart.model')



const router1 = new Router()


//crea carrito
router.post('/cart', async (req, res)=>{
  try{
    const createCart = await CartModel.create({
      products: [] 
    })

    res.status(201).send({
      status: 'success',
      payload: createCart
    })
  }catch (error){
  console.log(error)
  res.status(500).send({
    status: "error",
    message: "Ocurrio un error"
  })
  }
})


//busca carritos
router.get('/', async (req, res)=>{
  try {
  const carts = await CartModel.find({})
  console.log(carts)
  res.send(carts)
  } catch (error) {
    console.log(error)
  }
})




//busca carrito por id
router.get('/:cid', async (req, res)=>{
  try {
  let {cid} = req.params
  let cart = await CartModel.findOne({__id: cid})
  res.send(cart)
  } catch (error) {
    console.log(error)
    return res.status(404).send({status: 'error', message: "No se encuentra carrito"})
  }
})



//agrega productos al carrito
router.put('/carts/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;

    const cart = await CartModel.findByIdAndUpdate(cid, { products });
    res.send(cart);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al actualizar el carrito');
  }
});
//modifica cantidad de productos
router.put('/carts/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const cart = await CartModel.findById(cid);
    if (!cart) {
      return res.status(404).send('El carrito no existe');
    }

    const product = cart.products.find((p) => p.product.toString() === pid);
    if (!product) {
      return res.status(404).send('El producto no existe en el carrito');
    }

    product.quantity = quantity;
    await cart.save();

    res.send(cart);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al actualizar la cantidad del producto en el carrito');
  }
});






















// router.post('/cart', async (req, res) => {
//   try {
//     const cart = await CartManagerMongo.createCart()
//     res.status(201).send({
//       status: 'success',
//       payload: cart
//     })
//   } catch (err) {
//     console.error(err)
//     res.status(500).send({
//       status: 'error',
//       message: 'un error ocurrio creando el carrito'
//     })
//   }
// })



// router.get('/', async (req, res)=>{
//   try {
//     const carts = await CartManagerMongo.getCarts()
//     res.status(200).send({
//       status: 'success',
//       payload: carts
//     })
//   } catch (err) {
//     console.log(err)
//   }
// })


// router.get('/cid', async (req, res)=>{
//   try {
//     const {cid} = req.params
//     let cart = await CartManagerMongo.getCartById(cid)
//     return res.status(200).send({
//       status: 'success',
//       payload: cart
//     })
//   } catch (err){
//     console.log(err)
//   }
// })


// router.put('/cid', async (req,res) =>{
//   const {cid} = req.params
//   const cartId= cid
//   const updatedCart = req.body
//   try {
//     const newCart = await CartManagerMongo.updatedCart(cartId, updatedCart)
//     res.status(200).send({
//       status: 'success',
//       payload: newCart
//     })
//   } catch (err){
//     console.log(err)
//     res.status(500).json({ message: 'Error al actualizar el carrito' })
//   }
// })


// router.delete('/:id', async (req,res)=>{
//   try {
//       const cartId = req.params.id;
//       const deletedCart= await CartManagerMongo.deleteCart(cartId);
  
//       if (!deletedCart) {
//           return res.status(404).send({ error: 'Carrito no encontrado' });
//       }
//       return res.status(200).send({deletedCart})
//   } catch (error){
//       console.error(error)
//       return res.status(500).send({ error: "Ocurrió un error al eliminar el carrito" })
//   }
// })


































// router1.post('/', async (req, res) => {
//   try{
//     //llamo y creo un nuevo carrito
//     await CartMan.createCart()
//     //si fue creado correctamente
//     return res.status(201).send({ status:'success', mensaje: "Carrito creado" })
//   } catch (error){
//     console.log(error)
//     return res.status(500).send({error: "ocurrió un error al crear el carrito"})
//   }
// })

// router1.get('/:cid', async (req, res) =>{
//   try{
//     //obtener el Cart ID de params
//     const {cid} = req.params
//     //llamar a la función getCartID
//     const cart = await CartMan.getCartById(parseInt(cid))
//     //probando que funcione
//     console.log(cart)
//     //si no funciona
//     if(!cart){
//       return res.status(404).send({error: "no se encontro ningun carrito con ese ID"})
//     }
//     // si funciona
//     return res.status(200).send({status: "success", cart})
//   } catch (error){
//     console.log(error)
//     return res.status(500).send({error: "Ocurrió un error al obtener el carrito"})
//   }
// })

// router1.post("/:cid/product/:pid", async (req, res) => {
//   const { cid, pid } = req.params
//   const product = await ProductM.getProductById(parseInt(pid));
//   if (product) {
//     const cart = await CartMan.addToCart(parseInt(cid), parseInt(pid))
//     !cart ? res.status(404).send({error : "ocurrió un error al buscar el producto"}) : res.status(200).send(cart)
//   } else {
//     res.status(404).send({ error: "Product not found" })
//   }
// });


module.exports = router