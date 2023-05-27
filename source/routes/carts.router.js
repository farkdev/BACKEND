const { Router } = require('express')
const CartManagerMongo = require('../dao/cart.mongo');


const router = Router()
const cartManager = new CartManagerMongo

// crea carrito
router.post('/cart', async(req, res)=>{
    try{
        const newCart = {products:[]}
        await cartManager.addCart(newCart)
        res.status(201).send({ message: 'Carrito creado correctamente'})
    }catch(err){
        console.log(err)
    }
});


//GET CARRITOS
router.get('/', async(req, res) => {
  try {
      const carts = await cartManager.getCarts()
      res.status(200).send({
          status: 'success',
          payload: carts
      })
  }catch(error){
      return new Error(error)
  }
})


//CARRITOS POR ID
router.get('/:cid', async(req, res) => {
    try {
        const cid = req.params.cid
        const cart = await cartManager.getCartById(cid)
        res.status(200).send({
            status: 'success',
            payload: cart
        })
    }catch(error){
        return new Error(error)
    }
})

//PRODUCTOS DEL CARRITO
router.post('/:cid/product/:pid', async(req, res) =>{
    try{
        const cid = req.params.cid
        const pid = req.params.pid
        let cart = await cartManager.getCartById(cid)
        if (cart !== null) {
            let result = await cartManager.updateCart(cid, pid)
            res.status(200).send({
                status: 'success',
                payload: result})
        }else{
            res.status(400).send({
                status: 'Error',
                payload: "El carrito no existe"})
        }
    } catch(error) {
        return new Error(error)
    }
})

//PUT MODIFICA PRODUCTOS DEL CARRITO

router.put('/:cid/product/:pid', async(req, res) =>{
    try{
        const { cid, pid } = req.params
        const quantity = req.body
        console.log(quantity)
        let cart = await cartManager.getCartById(cid)
        if (cart !== null) {
            let result = await cartManager.updateCartProduct(cid, pid, quantity)
            res.status(200).send({
                status: 'success',
                payload: result})
            }
    } catch(error) {
        return new Error(error)
    }
})

//DELETE PRODUCTOS DEL CART
router.delete('/:cid/product/:pid', async(req, res) =>{
    try {   
        const cid = req.params.cid
        const pid = req.params.pid
        await cartManager.deleteCartByID(cid, pid)
        res.send({
            status: 'success',
            payload: `Producto id: ${pid} fue eliminado del carrito: ${cid}`
        })
    } catch (error) {
        return new Error(error)
    }
})

//BORRA CARRITO
router.delete('/:cid', async(req, res) =>{
    try {   
        const { cid } = req.params
        await cartManager.deleteCart({cid})
        res.send({
            status: 'success',
            payload: `Carrito id: ${cid} fue eliminado`
        })
    } catch (error) {
        return new Error(error)
    }
})




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