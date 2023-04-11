const { Router } = require('express')
const ProductManager  = require('../ProductManager2')
const PManager = new ProductManager()
const router = new Router()



function mid1(request, response, next){
    // request.dato1 = 'dato uno'
    response.send("no tenes permiso")
}

let products = []






router.get('/', async (request, response)=>{
    const products = await PManager.getProducts()
    response.send({status: 'success', payload: products})
})


router.get('/', async (request, response) =>{
    const limit = request.query.limit

    try{
     let productsToReturn = await PManager.getProducts()
     let products = productsToReturn

     if(limit&& parseInt(limit) > 0){
        productsToReturn = productsToReturn.slice(0,parseInt(limit))
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
    const newProduct = request.body
    if (!newProduct.titulo || !newProduct.descripcion){
        return response.status(400).send({error: "el producto debe tener un titulo y descripción"})
    }
    if(!Number.isFinite(newProduct.precio) || newProduct.precio <= 0){
        return response.status(400).send({error: "precio debe ser un número positivo"})
    }
    if(!Number.isFinite(newProduct.code) || newProduct.code < 0 ){
        return response.status(400).send({error: "el producto debe poseer un código y debe ser un número positivo"})
    }
    if(!Number.isFinite(newProduct.stock) || newProduct.stock <= 0 ){
        return response.status(400).send({error: "el producto debe tener un stock disponible"})
    }
    
    const product = PManager.addProduct(newProduct)
    response.status(200).send({product: product})

})

router.put('/:pid', (request, response)=>{
    const {pid} = request.params
    const updatedProduct = request.body
    
    const productIndex = products.findIndex(product => product.code == pid)

    if(productIndex=== -1){
        return response.status(400).send({error: "Producto no encontrado"})
    }

    if(!updatedProduct.titulo || !updatedProduct.descripcion){
        return response.status(400).send({error: "El producto debe tener título y descripción"})
    }
    if(!Number.isFinite(updatedProduct.precio) || updatedProduct.precio <= 0 ){
        return response.status(400).send({error: "El precio debe ser un número positivo"})
    }
    if(!Number.isFinite(updatedProduct.code) ||updatedProduct.code < 0){
        return response.status(400).send({error: "El producto debe tener un código"})
    }
    if(!Number.isFinite(updatedProduct.stock) || updatedProduct.stock <= 0){
        return response.status(400).send({error: "El producto debe tener un stock"})
    }

    products[productIndex] = updatedProduct

    response.status(200).send({products})

})


router.delete('/:code', (req, res) => {
    const productCode = parseInt(req.params.code);
    const productIndex = products.findIndex(product => product.code === productCode);
  
    if (productIndex === -1) {
      return res.status(404).send({ error: 'Producto no encontrado' });
    }
  
    products.splice(productIndex, 1);
    res.status(200).send({ products });
});



module.exports = router