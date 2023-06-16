const { productService } = require("../service");

class productController {
    getProducts(req, res) {
        productService.getProductsM()
            .then(result => {
                let user = req.session.user;
                res.render('home', {
                    title: "Lista de Productos",
                    payload: result,
                    user
                });
            })
            .catch(err => {
                console.log(err);
                res.render('error', { status: 'error', error: 'Ocurrió un error en la página' });
            });
    }

    getById(req, res) {
        const pid = req.params.pid;
        const { limit = 4 } = req.query;
        const { page = 1 } = req.query;
        const { sort } = req.query;
        let sortOptions = {};

        if (sort === 'asc') {
            sortOptions = { price: 1 };
        } else if (sort === 'desc') {
            sortOptions = { price: -1 };
        }

        productService.getProductById(pid, { limit, page, sortOptions })
            .then(result => {
                const { docs, totalPages, prevPage, nextPage, hasPrevPage, hasNextPage } = result;
                const prevLink = hasPrevPage ? `/products/${pid}?page=${prevPage}&limit=${limit}&sort=${sort}` : null;
                const nextLink = hasNextPage ? `/products/${pid}?page=${nextPage}&limit=${limit}&sort=${sort}` : null;

                res.render('products', {
                    status: 'success',
                    payload: docs,
                    totalPages,
                    prevPage,
                    nextPage,
                    page,
                    hasPrevPage,
                    hasNextPage,
                    prevLink,
                    nextLink
                });
            })
            .catch(err => {
                console.log(err);
                res.render('error', { status: 'error', error: 'Ocurrió un error en la página' });
            });
    }

    async updProduct(req, res) {
        try {
            const id = req.params.pid;
            const productModify= req.body
            const modifiedProduct= await productService.updateProduct(id, productModify)
            Object.keys(modifiedProduct).length === 0
            ? res.status(400).send({ error: 'No se ha podido modificar!' })
            : res.status(200).send({ status: `el producto con ID ${id} se ha modificado con exito!`, payload: productModify })
        }catch(err){
            console.log(err)
        }
    }
    
    async delete(req, res){
        try{
            const id = req.params.pid;
            const deletedProduct = await productService.deleteProduct(id)
            Object.keys(deletedProduct).length === 0
            ? res.status(404).send({error: `El producto con ID ${id} no existe`})
            : res.status(200).send({ status:`El producto con ID ${id} se ha eliminado`, payload: deletedProduct});
        }catch(err){
            console.log(err)
        }
    }



}

module.exports = new productController();
