const { logger } = require("../../config/logger")
const  {productModel}  = require("./models/products.model")




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
            logger.error(error);
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
            logger.error(err)
        }
    }

    async deleteProduct(pid){
        try {
            return await this.productModel.findByIdAndDelete(pid)
        } catch (err) {
            logger.error(err)
        }
    }
}


module.exports =  ProductManagerMongo;