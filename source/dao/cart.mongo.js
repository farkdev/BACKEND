const { cartModel } = require('./models/cart.model')



class CartManagerMongo {
    async getCarts (){
        try{
            return await cartModel.find({})
        }catch (err){
            return new Error(err)
        }

    }

    async getCartById(cid){
        try{
            return await cartModel.findOne({cid})
        } catch (err){
            return new Error (err)
        }
    }


    async addCart(newCart){
        try{
            return await cartModel.create(newCart)
        } catch (err){
            return new Error (err)
        }
    }


    async updateCart(cid, updatedCart){
        try{
            return await cartModel.findByIdAndUpdate(cid, updatedCart, {new: true})
        } catch (err){
            return new Error (err)
        }
    }


    async deleteCart(cid){
        try {
            return await cartModel.findByIdAndDelete(cid)
        } catch (err){
            return new Error(err)
        }
    }

    async removeAllProductsFromCart(cid) {
        try {
          const cart = await cartModel.findById(cid);
    
          if (!cart) {
            return null; // Carrito no encontrado
          }
    
          cart.items = []; // Elimina todos los productos del carrito
          cart.total = 0; // Resetea el total del carrito
    
          await cart.save();
    
          return cart;
        } catch (err) {
          throw new Error(err);
        }
    }
}



module.exports = CartManagerMongo