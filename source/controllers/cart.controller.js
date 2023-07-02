const { cartService, productService } = require("../service");
const { v4: uuidv4 } = require('uuid');
const { sendMail } = require('../utils/nodemailer')

class cartController {

    createCart = async(req, res)=>{
        try{
            const newCart = {products:[]}
            await cartService.addCart(newCart)
            res.status(201).send({ message: 'Carrito creado correctamente'})
        }catch(err){
            console.log(err)
        } 
    }


    getCars = async (req, res)=>{
        try{
            const carts = await cartService.getCarts()
            res.status(200).send({
            status: 'success',
            payload: carts
        })
        } catch (error){
            console.log(error)
        }
    }

    getCartByID = async (req, res)=>{
        try{
            const cid = req.params.cid
            const cart = await cartService.getCartById(cid)
            res.status(200).send({
            status: 'success',
            payload: cart
        })
        }catch(error){
            return new Error(error)
        }
    }


    cartProducts = async(req, res) =>{
        try{
            const cid = req.params.cid
            const pid = req.params.pid
            let cart = await cartService.getCartById(cid)
            if (cart !== null) {
                let result = await cartService.addToCart(cid, pid)
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
    }

    cartProdUpd = async(req, res) =>{
        try{
            const { cid, pid } = req.params
            const quantity = req.body
            console.log(quantity)
            let cart = await cartService.getCartById(cid)
            if (cart !== null) {
                let result = await cartService.modifyProdFromCart(cid, pid, quantity)
                res.status(200).send({
                    status: 'success',
                    payload: result})
                }
        } catch(error) {
            return new Error(error)
        }
    }

    cartDelProd = async(req, res) =>{
        try {   
            const cid = req.params.cid
            const pid = req.params.pid
            await cartService.deleteCartByID(cid, pid)
            res.send({
                status: 'success',
                payload: `Producto id: ${pid} fue eliminado del carrito: ${cid}`
            })
        } catch (error) {
            return new Error(error)
        }
    }

    cartDelete = async (req, res) =>{
        try {   
            const { cid } = req.params
            await cartService.deleteCart({cid})
            res.send({
                status: 'success',
                payload: `Carrito id: ${cid} fue eliminado`
            })
        } catch (error) {
            return new Error(error)
        }

    }

    purchaseCart = async (req, res) => {
        try {
            const cid = req.params
            //busco carrito por ID
            const cart = await cartService.getCartById(cid)
            


            if(!cart){
                res.status(404).send({message: "No se encontro el carrito"})
            }
            const prodSinStock = []
            //VERIFICO STOCK DEL PROD
            for (const item of cart.products) {
                const product = await productService.getProductById(item.product._id)
                if (product && product.stock >= item.quantity){
                    item.product.stock -= item.quantity
                    await productService.updateProduct(item.product._id, product)
                } else {
                    prodSinStock.push(item)
                } 
            }

            //actualizo carrito
            const purchasedProducts = cart.products.filter(item => !prodSinStock.some(p => p.product._id === item.product._id))
            if (purchasedProducts.length > 0){
                const ticket = {
                    code: uuidv4(),
                    purchase_datetime: new Date(),
                    amount: purchasedProducts.reduce((total, item) => total + (item.quantity * item.product.price), 0),
                    purchaser: req.user.email
                }
                //genero el ticket con datos de compra
                const newticket = await cartService.generateTicket(ticket)
                cart.products = prodSinStock
                await cartService.modifyProdFromCart(cid, prodSinStock)
                if(prodSinStock.length > 0){
                    await sendMail(ticket)
                    res.status(201).send({
                        message: "Compra realizada, hay algunos productos sin stock", 
                        ticket: newticket
                    })
                } else {
                    await sendMail(ticket)
                    res.status(201).send({message: "compra realizada correctamente", ticket: newticket})
                }
            } else {
                const prodSinStockID = prodSinStock.map(item=> item.product._id)
                res.status(200).send({message: "la compra no pudo realizarse", payload: prodSinStockID})
            }
            
        } catch (error){
            console.log(error)
        }
    }





}

module.exports = new cartController()