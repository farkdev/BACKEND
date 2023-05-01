const ProdManager = require('../../dao/ProductManager2')
const PrManager = new ProdManager()

const socketProducts = async(io) =>{
    const products = await PrManager.getProducts()
    io.on('connection', socket =>{
        console.log('cliente conectado')
        socket.emit('productos', products)
        

        socket.emit('addProduct', data=>{
            console.log(data)
            PrManager.addProduct(data)
        })


    })
}

module.exports = {
    socketProducts
}