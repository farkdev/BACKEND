const { logger } = require('../../config/logger')
const { CartModel } = require('./models/cart.model')
const { TicketModel } = require('./models/ticketModel')


class CartManagerMongo {
    constructor(){
        this.cartModel= CartModel
    
    }

    async getCarts (){
        try{
            return await this.cartModel.find({})
        }catch (error){
            logger.error(error)
        }

    }

    async getCartById(cid){
        try{
            return await this.cartModel.findOne({_id: cid}).lean();
        } catch (error){
            logger.error(error)
        }
    }


    async createCart(newCart){
        try{
            return await this.cartModel.create(newCart)
        } catch (error){
            logger.error(error)
        }
    }

    
   
      

    async addToCart(cid, pid, quantity){
        try{
            const respUpdate= await this.cartModel.findOneAndUpdate(
                {_id: cid,"products.product": pid},
                { $inc: { "products.$.quantity": quantity} },
                {new:true}
            )
            if(respUpdate){
                return respUpdate
            }

            return await this.cartModel.findOneAndUpdate(
                {_id: cid},
                { $push: { products: { product: pid, quantity} } },
                {new:true, upsert:true}
            )
        }catch(error){
            logger.error(error)
        }
    }



    //MODIFICA CANTIDAD DE UN PROD DEL CART
    async modifyProdFromCart(cid, pid, quantity){
        try{
            return await this.cartModel.findOneAndUpdate(
                {_id: cid, 'products.product':pid},
                {$set: {"products.$.quantity": quantity}},
                {new:true}
            )
        } catch (error){
            logger.error(error)
        }
    }   


    
    //ELIMINA UN PRODUCTO DEL CARRITO
    async removeProductFromCart(cid, pid){
        try {
            return await cartModel.findOneAndDelete({_id: cid}, {$pull: {products: {productID: pid}}},{new: true});
        } catch (error) {
            logger.error(error)
        }
    }
    //ELIMINA TODOS LOS PRODUCTOS
    async removeAllProductsFromCart(cid) {
        try {
          const cart = await cartModel.findById(cid);
    
          if (!cart) {
            return null; // Carrito no encontrado
          }
    
            cart.products = [];
            cart.total = 0;

    
          await cart.save();
    
          return cart;
        } catch (error) {
            logger.error(error);
        }
    }


    async deleteCart(cid){
        try {
            return await this.cartModel.findOneAndUpdate(
                {_id:cid},
                {$set: {products:[]}},
                {new:true}
            )
        } catch (error){
            logger.error(error)
        }
    }

    async generateTicket(newTicket){
        try{
            return await TicketModel.create(newTicket)
        } catch (error) {
            logger.error(error)
        }
    }
    
}



module.exports = CartManagerMongo