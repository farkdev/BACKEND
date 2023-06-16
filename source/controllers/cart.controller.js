const { cartService } = require("../service");

class cartController {

    createCart = async(req, res)=>{
        try{
            const newCart = {products:[]}
            await cartManager.addCart(newCart)
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
                let result = await cartService.updateCart(cid, pid)
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
                let result = await cartService.updateCartProduct(cid, pid, quantity)
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
            await cartManager.deleteCart({cid})
            res.send({
                status: 'success',
                payload: `Carrito id: ${cid} fue eliminado`
            })
        } catch (error) {
            return new Error(error)
        }

    }


}

module.exports = new cartController()