const { Router } = require('express')
const ProductManagerMongo = require('../dao/product.mongo')
const { productModel } = require('../dao/models/products.model')

const router = Router()
const PManager = new ProductManagerMongo;



router.get('/', async (req, res) => {
	try{
        const {limit= 2}= req.query
        const{page=1} = req.query
        const { sort } = req.query;
        let sortOptions={}

        if (sort === 'asc') {
            sortOptions = { price: 1 };
        } else if (sort === 'desc') {
            sortOptions = { price: -1 };
        }

        let { 
            docs, 
            totalPages,
            prevPage, 
            nextPage,
            hasPrevPage, 
            hasNextPage 
        } = await productModel.paginate({},{limit: limit , page: page, sort: sortOptions})

        !hasPrevPage
        ? prevLink = null
        : prevLink =`/api/products?page=${prevPage}&limit=${limit}&sort=${sort}`

        !hasNextPage 
        ?nextLink = null
        :nextLink =`/api/products?page=${nextPage}&limit=${limit}&sort=${sort}`

        res.send({
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
        })
	} catch(err){
	    console.log(err)
	}
});


router.get('/:pid', async (req, res) => {
	try{
		const id = req.params.pid;
		const product = await PManager.getProductById(id);
        Object.keys(product).length === 0
        ?res.status(404).send({ error: 'No existe el producto' })
		:res.send(product); 
	} catch(err){
		console.log(err)
	}
});


router.post('/' , async (req, res)=>{
    try{
        const product = req.body
        const newProduct = await PManager.addProduct(product)
        Object.keys(newProduct).length === 0
        ? res.status(400).send({ error: "No se pudo agregar el producto" })
        : res.status(201).send({status:'producto agregado', payload: newProduct})
    } catch(err){
        console.log(err)
    }
});

router.put('/:pid', async (req, res)=>{
    try{
        const id = req.params.pid;
        const productModify= req.body
        const modifiedProduct= await PManager.updateProduct(id, productModify)
        Object.keys(modifiedProduct).length === 0
        ? res.status(400).send({ error: 'No se ha podido modificar!' })
        : res.status(200).send({ status: `el producto con ID ${id} se ha modificado con exito!`, payload: productModify })
    }catch(err){
        console.log(err)
    }
});


router.delete('/:pid', async(req, res)=>{
    try{
        const id = req.params.pid;
        const deletedProduct = await PManager.deleteProduct(id)
        Object.keys(deletedProduct).length === 0
        ? res.status(404).send({error: `El producto con ID ${id} no existe`})
        : res.status(200).send({ status:`El producto con ID ${id} se ha eliminado`, payload: deletedProduct});
    }catch(err){
        console.log(err)
    }
});


module.exports= router;
// function mid1(request, response, next){
//     // request.dato1 = 'dato uno'
//     response.send("no tenes permiso")
// }

// let products = PManager.getProducts().then((data)=>{
//     products = data
// })




// router.get('/', async (req, res)=>{
//     try {
//         const products = await ProductManagerMongo.getProductsM()
//         res.status(200).send({
//             status: 'success',
//             payload: products
//         })
//     } catch(err){
//         console.log(err)
//     }
// })


// router.get('/:pid', async (req, res)=>{
//     try {
//         const {pid} = req.params
//         let product = await ProductManagerMongo.getProductById(pid)
//         res.status(200).send({
//             status: 'success',
//             payload: product
//         })
//     }catch (err){
//         console.log(err)
//     }
// })


// router.post('/', async (req, res)=>{
//     try{
//         const newProduct = req.body
//         let result = await ProductManagerMongo.addProduct(newProduct)
//         res.status(200).send({
//             status: 'success',
//             payload: result
//         })
//     }catch (err){
//         console.log(err)
//     }
// })

// router.put('/:pid', async (req, res) => {
//     const { pid } = req.params
//     const productId = pid
//     const updatedProduct = req.body;
  
//     try {
//       const result = await ProductManagerMongo.updateProduct(productId, updatedProduct);
//       res.status(200).send({
//         status: 'success',
//         payload: result
//       })
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Error al actualizar producto' });
//     }
// });


// router.delete('/:id', async (req,res)=>{
//     try {
//         const productId = req.params.id;
//         const deletedProduct= await ProductManagerMongo.deleteProduct(productId);
    
//         if (!deletedProduct) {
//             return res.status(404).send({ error: 'Producto no encontrado' });
//         }
//         return res.status(200).send({deletedProduct})
//     } catch (error){
//         console.error(error)
//         return res.status(500).send({ error: "Ocurrió un error al eliminar el producto" })
//     }
// })












module.exports = router