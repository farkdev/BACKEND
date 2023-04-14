const { Router } = require('express')
const ProductManager  = require('../ProductManager2')
const PManager = new ProductManager()
const router = new Router()



function mid1(request, response, next){
    // request.dato1 = 'dato uno'
    response.send("no tenes permiso")
}

let products = PManager.getProducts().then((data)=>{
    products = data
})






router.get('/', async (request, response)=>{
    try{
        const products = await PManager.getProducts()
        response.send({status: 'success', payload: products})
    } catch (error) {
        console.log(error)
        response.status(500).send({error: "ocurrió un error al obtener los productos"})
    }
})


router.get('/', async (request, response) =>{
    const limit = request.query.limit
    console.log(limit)
    try{
     let productsToReturn = await PManager.getProducts()
     let products = productsToReturn

     if(limit&& limit > 0){
        products = productsToReturn.slice(0,limit)
     }
     return response.send({products})
    } catch (error){
     console.log(error)
     return response.status(500).send({error: "Ocurrió un error al obtener los productos"})
    }

})

router.get('/:pid', async (request, response) => {
    const productId = request.params.pid;
    try{ 
        let product = product.find(p=>p.id===Number(productId))
        if(!product) {
            return response.status(404).send({error: "producto no encontrado"})
        }
    
        return response.send({product})
    } catch (error){
        console.error(error)
        return response.status(500).send({error : "ocurrió un error al buscar el producto"})
    }
    
})

router.post('/', (request, response)=>{
    try {
        const newProduct = request.body
        if (!newProduct.title || !newProduct.description){
            return response.status(400).send({error: "el producto debe tener un titulo y descripción"})
        }
        if(!Number.isFinite(newProduct.price) || newProduct.price <= 0){
            return response.status(400).send({error: "precio debe ser un número positivo"})
        }
        if(!Number.isFinite(newProduct.code) || newProduct.code < 0 ){
            return response.status(400).send({error: "el producto debe poseer un código y debe ser un número positivo"})
        }
        if(!Number.isFinite(newProduct.stock) || newProduct.stock <= 0 ){
            return response.status(400).send({error: "el producto debe tener un stock disponible"})
        }

        if(!newProduct.category){
            return response.status(400).send({error: "el producto debe tener una categoría"})
        }
        if(!newProduct.status){
            newProduct.status = true
        }
        const product = PManager.addProduct(newProduct)
        response.status(200).send({product: product})
    } catch (error){
        console.log(error)
        return response.status(500).send({ error: "ocurrió un error al agregar el producto" })
    }
        

})

router.put('/:pid', async (request, response)=>{
    try {
        const { pid } = request.params
        const updatedProduct = request.body
        const product = await PManager.updateProduct(parseInt(pid), updatedProduct)

        if (!product) {
            return response.status(404).send({ error: "producto no encontrado" })
        }
        return response.status(200).send({ product })
    } catch (error) {
        console.error(error)
        return response.status(500).send({ error: "ocurrió un error al actualizar el producto" })
    }
})


router.delete('/:id', async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        console.log(productId)
        const product= await PManager.deleteProduct(productId);
  
        if (!product) {
            return res.status(404).send({ error: 'Producto no encontrado' });
        }
        return res.status(200).send({product})
    } catch (error){
        console.error(error)
        return res.status(500).send({ error: "Ocurrió un error al eliminar el producto" })
    }
})


module.exports = router