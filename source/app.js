const express = require('express')

const ProductManager = require('./ProductManager2');
const products = require('./data.json')

const PM = new ProductManager
const app = express()


app.use(express.urlencoded({extended:true}))


app.get('/products', (request, response) =>{
    const limit = request.query.limit
   try{
    let productsToReturn = products
    if(limit&& parseInt(limit) > 0){
        productsToReturn = products.slice(0,parseInt(limit))
    }
    return response.send({products: productsToReturn})
   } catch (error){
    console.error(error)
    return response.status(500).send({error: "ocurrió un error al obtener los productos"})
   }
})


app.get('/products/:pid', async (request, response) => {
    const productId = request.params.pid;
    try{ 
        let product = products.find(p=>p.id===productId)
        if(!product) {
            return response.status(404)({error: "producto no encontrado"})
        }
    
    return response.send({product})
    } catch (error){
        console.error(error)
        return response.status(500).send({error : "ocurrió un error al buscar el producto"})
    }

})



app.listen(8080, ()=>{
    console.log("servidor funcionando!")
})
