class ProductRepo {
    constructor(dao){
        this.dao = dao
    }



    getProducts(limit, page, sortOptions){
        return this.dao.getProducts(limit, page, sortOptions)
    }

    getProductById(pid){
        return this.dao.getProductById(pid)
    }

    createProduct(newProduct){
        return this.dao.newProduct(newProduct)
    }

    updateProduct(pid){
        return this.dao.updateProduct(pid)
    }

    deleteProduct(pid, obj){
        return this.dao.deleteProduct(pid, obj)
    }
}



module.exports = ProductRepo
