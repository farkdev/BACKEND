const { Router } = require('express')
const ProductManager  = require('../ProductManager2');
const CartManager = require('../cartManager')
const router = require('./products.router');
const ProductM = new ProductManager()
const CartMan = new CartManager('./cart.json')
const router1 = new Router()




router1.post('/', async (req, res) => {
  await CartMan.createCart()
  res.status(201).send({ status:'success', mensaje: "Carrito creado" })
})

router1.get('/:cid', async (req, res) =>{
  const {cid} = req.params
  const cart = await CartMan.getCartById(parseInt(cid))
  !cart ? res.status(404).send({error: "Ocurrió un error al obtener el carrito"}) : res.status(200).send({status:'success', cart})
})

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params
  const product = await productManager.getProductById(parseInt(pid));
  if (product) {
    const cart = await cartManager.addToCart(parseInt(cid), parseInt(pid))
    !cart ? res.status(404).send(notFound) : res.status(200).send(cart)
  } else {
    res.status(404).send({ error: "Product not found" })
  }
});


module.exports = router1()