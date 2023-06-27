const { CartModel } = require('./models/cart.model')



class CartManagerMongo {


     async getCarts (){
        try{
            return await CartModel.find({})
        }catch (err){
            return new Error(err)
        }

    }

    async getCartById(cid){
        try{
            return await CartModel.findOne({_id: cid}).lean();
        } catch (err){
            return new Error (err)
        }
    }


    async addCart(newCart){
        try{
            return await CartModel.create(newCart)
        } catch (err){
            return new Error (err)
        }
    }


    async updateCart(cid, pid){
        try {
            const cart = await CartModel.findOne({_id: cid, "products.productID": pid})
            //console.log(`carrito: ${cart}`)
            if (cart !== null) {
                return await CartModel.updateOne({_id: cid, "products.productID": pid}, {$inc: { "products.$.quantity": 1}})          
            }else{
                return await CartModel.updateOne({_id: cid}, {$push: { products: {productID: pid, quantity: 1}}})
            }
        } catch (error) {
            return new Error(error)
        }
    }

    async updateCartProduct(cid, pid, quantity){
        try {
            const cart = await CartModel.findOne({_id: cid, "products.productID": pid})
            
            if (cart !== null) {
                
                return await CartModel.findOneAndUpdate({_id: cid, "products.productID": pid}, {$set: { "products.$.quantity": quantity}})
            }
        } catch (error) {
            return new Error(error)
        }
    }


    async deleteCart(cid){
        try {
            return await CartModel.deleteOne({_id: cid})
        } catch (err){
            return new Error(err)
        }
    }

    async deleteCartByID(cid, pid){
        try {
            return await CartModel.findOneAndDelete({_id: cid}, {$pull: {products: {productID: pid}}},{new: true});
        } catch (error) {
            return new Error(error)
        }
    }

    async removeAllProductsFromCart(cid) {
        try {
          const cart = await CartModel.findById(cid);
    
          if (!cart) {
            return null; // Carrito no encontrado
          }
    
            cart.products = [];
            cart.total = 0;

    
          await cart.save();
    
          return cart;
        } catch (err) {
          throw new Error(err);
        }
    }
}



module.exports = CartManagerMongo