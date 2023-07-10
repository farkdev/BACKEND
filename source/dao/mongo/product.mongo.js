const  productModel  = require("./models/products.model")




class ProductManagerMongo {
    constructor(){
        this.productModel = productModel
    }

    async getProducts (){
        try {
            return await this.productModel.find({}).lean()
        }catch (err){
            return new Error(err)
        }
    }

    async getProductById(pid){
        try {
            return await this.productModel.findOne({_id: pid})
        } catch (error){
            throw new Error('ha ocurrido un error buscando el producto');
        }
    }
    

    async addProduct(newProduct){
        try {
            return await this.productModel.create(newProduct)
        } catch (err) {
            return new Error(err)
        }
    }

    async updateProduct(pid, updatedProduct){
        try {
            return await this.productModel.findByIdAndUpdate(pid, updatedProduct, { new: true })
        } catch (err) {
            return new Error(err)
        }
    }

    async deleteProduct(pid){
        try {
            return await this.productModel.findByIdAndDelete(pid)
        } catch (err) {
            return new Error(err)
        }
    }
}


module.exports =  ProductManagerMongo;