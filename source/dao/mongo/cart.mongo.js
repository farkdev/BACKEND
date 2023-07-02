const { CartModel } = require('./models/cart.model')
const { ticketModel } = require('./models/ticketModel')


class CartManagerMongo {
    constructor(){
        this.cartModel= CartModel
    
    }

    async getCarts (){
        try{
            return await this.cartModel.find({})
        }catch (err){
            return new Error(err)
        }

    }

    async getCartById(cid){
        try{
            return await this.cartModel.findOne({_id: cid}).lean();
        } catch (err){
            return new Error (err)
        }
    }


    async createCart(newCart){
        try{
            return await this.cartModel.create(newCart)
        } catch (err){
            return new Error (err)
        }
    }

    async addToCart(cid, pid, quantity) {
        try {
            const cart = await this.cartModel.findOne({_id: cid, "products.productID": pid});
    
            if (cart !== null) {
                await this.cartModel.updateOne({_id: cid, "products.productID": pid}, {$inc: { "products.$.quantity": 1}});
                return await this.cartModel.findOneAndUpdate({_id: cid, "products.productID": pid}, {$set: { "products.$.quantity": quantity}});
            } else {
                return await this.cartModel.updateOne({_id: cid}, {$push: { products: {productID: pid, quantity: quantity}}});
            }
        } catch (error) {
            return new Error(error);
        }
    }


    //SIMPLIFICO CODIGO--------------------------------------------------------------
    // async addToCart(cid, pid){
    //     try {
    //         const cart = await cartModel.findOne({_id: cid, "products.productID": pid})
    //         //console.log(`carrito: ${cart}`)
    //         if (cart !== null) {
    //             return await cartModel.updateOne({_id: cid, "products.productID": pid}, {$inc: { "products.$.quantity": 1}})          
    //         }else{
    //             return await cartModel.updateOne({_id: cid}, {$push: { products: {productID: pid, quantity: 1}}})
    //         }
    //     } catch (error) {
    //         return new Error(error)
    //     }
    // }

    // async updateCartProduct(cid, pid, quantity){
    //     try {
    //         const cart = await cartModel.findOne({_id: cid, "products.productID": pid})
            
    //         if (cart !== null) {
                
    //             return await cartModel.findOneAndUpdate({_id: cid, "products.productID": pid}, {$set: { "products.$.quantity": quantity}})
    //         }
    //     } catch (error) {
    //         return new Error(error)
    //     }
    // }
    //SIMPLIFICO CODIGO--------------------------------------------------------------



    //MODIFICA CANTIDAD DE UN PROD DEL CART
    async modifyProdFromCart(cid, pid, quantity){
        try{
            return await this.cartModel.findOneAndUpdate(
                {_id: cid, 'products.product':pid},
                {$set: {"products.$.quantity": quantity}},
                {new:true}
            )
        } catch (error){
            console.log(error)
        }
    }   


    
    //ELIMINA UN PRODUCTO DEL CARRITO
    async removeProductFromCart(cid, pid){
        try {
            return await cartModel.findOneAndDelete({_id: cid}, {$pull: {products: {productID: pid}}},{new: true});
        } catch (error) {
            return new Error(error)
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
        } catch (err) {
          throw new Error(err);
        }
    }


    async deleteCart(cid){
        try {
            return await cartModel.deleteOne({_id: cid})
        } catch (err){
            return new Error(err)
        }
    }

    async generateTicket(newTicket){
        try{
            return await ticketModel.create(newTicket)
        } catch (err) {
            console.log(err)
        }
    }
    


}



module.exports = CartManagerMongo