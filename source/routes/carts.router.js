const { Router } = require('express')
const CartManagerMongo = require('../dao/mongo/cart.mongo');
const cartController = require('../controllers/cart.controller');


const router = Router()
const cartManager = new CartManagerMongo


// crea carrito
router.post('/cart', cartController.createCart);
//GET CARRITOS
router.get('/', cartController.getCars)
//CARRITOS POR ID
router.get('/:cid', cartController.getCartByID)
//PRODUCTOS DEL CARRITO
router.post('/:cid/product/:pid', cartController.cartProducts)
//PUT MODIFICA PRODUCTOS DEL CARRITO
router.put('/:cid/product/:pid', cartController.cartProdUpd)
//DELETE PRODUCTOS DEL CART
router.delete('/:cid/product/:pid', cartController.cartDelProd)
//BORRA CARRITO
router.delete('/:cid', cartController.cartDelete)




// //busca carritos
// router.get('/', async (req, res)=>{
//   try {
//     const carts = await CartModel.find()
//     res.status(200).send({
//       status: success,
//       payload: carts
//     })
//   } catch (error) {
//     return new Error(error)
//   }
// })




// //busca carrito por id
// router.get('/:cid', async (req, res)=>{
//   try {
//   let {cid} = req.params
//   let cart = await CartModel.getCartById(cid)
//   res.status(200).send({
//     status: 'success',
//     payload: cart
// })
//   } catch (error) {
//     console.log(error)
//     return res.status(404).send({status: 'error', message: "No se encuentra carrito"})
//   }
// })



// //agrega productos al carrito
// router.put('/carts/:cid', async (req, res) => {
//   try {
//     const { cid } = req.params;
//     const { products } = req.body;

//     const cart = await CartModel.findByIdAndUpdate(cid, { products });
//     res.send(cart);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send('Error al actualizar el carrito');
//   }
// });


// //modifica cantidad de productos
// router.put('/carts/:cid/products/:pid', async (req, res) => {
//   try {
//     const { cid, pid } = req.params;
//     const { quantity } = req.body;

//     const cart = await CartModel.findById(cid);
//     if (!cart) {
//       return res.status(404).send('El carrito no existe');
//     }

//     const product = cart.products.find((p) => p.product.toString() === pid);
//     if (!product) {
//       return res.status(404).send('El producto no existe en el carrito');
//     }

//     product.quantity = quantity;
//     await cart.save();

//     res.send(cart);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send('Error al actualizar la cantidad del producto en el carrito');
//   }
// });






















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



module.exports = router