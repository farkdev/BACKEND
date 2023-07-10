const { productService } = require("../service/index");
const { productDto }  = require('../dto/product.dto')
const { Error } = require('../utils/CustomError/error');
const { CustomError } = require("../utils/CustomError/customError");
const { createProductErrorInfo } = require("../utils/CustomError/info");
const productGenerator = require("../utils/productMockGen");


class productController {
    
    getProducts = async (req, res) => {
        try {
            const {limit= 5}= req.query
            const{page=1} = req.query
            const { sort } = req.query;
            let user = req.session.user;
            const products = await productService.getProducts(limit, page, sort)
            res.render('home', {
                title: "Lista de Productos",
                payload: products,
                user
            });
        } catch (err) {
            console.log(err)
            res.render('error', { status: 'error', error: 'Ocurrió un error en la página' })
        }
    }


    
    getProductById = async(req, res) => {
        try{
            const id = req.params.pid;
            const product = await productService.getProductById(id);
            return res.status(200).send(product)
        } catch(err){
            console.log(err)
        }
    }

    

    createProd = async (req, res)=>{
        try{
            const {title, description, price, code, stock, category, thumbnail} = req.body
            if(!title || !description || !price || !code || !stock || !category){
                CustomError.createError({
                    name: 'ERROR, PROD CREATION',
                    cause: createProductErrorInfo({
                        title, 
                        description, 
                        price, 
                        code, 
                        category,
                        stock, 
                    }),
                    message: 'Error creating product',
                    code: Error.INVALID_TYPE_ERROR
                })
            }
            const newProduct = new productDto({title, description, price, code, stock, category, thumbnail})
            const product = await productService.addProduct(newProduct)
            !product
            ? res.status(400).send({ error: "No se pudo crear el producto" })
            : res.status(201).send({status:'producto creado', payload: product})
        } catch(err){
            console.log(err)
        }
    }


    updProduct = async (req, res) =>{
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
    
    delete = async (req, res) => {
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
    
    generateProductsMock = async(req,res)=>{
        try {
            let products = []
            for (let i = 0; i < 50 ; i++) {
                products.push(productGenerator())  
            }
            res.send({status: 'success', payload: products})
        } catch (error) {
            console.log(error)
        }
    }
}



module.exports = new productController();


// getById(req, res) {
    //     const pid = req.params.pid;
    //     const { limit = 4 } = req.query;
    //     const { page = 1 } = req.query;
    //     const { sort } = req.query;
    //     let sortOptions = {};

    //     if (sort === 'asc') {
    //         sortOptions = { price: 1 };
    //     } else if (sort === 'desc') {
    //         sortOptions = { price: -1 };
    //     }

    //     productService.getProductById(pid, { limit, page, sortOptions })
    //         .then(result => {
    //             const { docs, totalPages, prevPage, nextPage, hasPrevPage, hasNextPage } = result;
    //             const prevLink = hasPrevPage ? `/products/${pid}?page=${prevPage}&limit=${limit}&sort=${sort}` : null;
    //             const nextLink = hasNextPage ? `/products/${pid}?page=${nextPage}&limit=${limit}&sort=${sort}` : null;

    //             res.render('products', {
    //                 status: 'success',
    //                 payload: docs,
    //                 totalPages,
    //                 prevPage,
    //                 nextPage,
    //                 page,
    //                 hasPrevPage,
    //                 hasNextPage,
    //                 prevLink,
    //                 nextLink
    //             });
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             res.render('error', { status: 'error', error: 'Ocurrió un error en la página' });
    //         });
    // }