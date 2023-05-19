const { productModel } = require("./models/products.model")




class ProductManagerMongo {
    
    async getProductsM (){
        try {
            return await productModel.find({}).lean()
        }catch (err){
            return new Error(err)
        }
    }

    async getProductById(pid){
        try {
            return await productModel.findOne({_id: pid})
        } catch (error){
            return new Error(error)
        }
    }
    

    async addProduct(newProduct){
        try {
            return await productModel.create(newProduct)
        } catch (err) {
            return new Error(err)
        }
    }

    async updateProduct(pid, updatedProduct){
        try {
            return await productModel.findByIdAndUpdate(pid, updatedProduct, { new: true })
        } catch (err) {
            return new Error(err)
        }
    }

    async deleteProduct(pid){
        try {
            return await productModel.findByIdAndDelete(pid)
        } catch (err) {
            return new Error(err)
        }
    }
}


module.exports =  ProductManagerMongo;