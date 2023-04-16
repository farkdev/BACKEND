const express = require('express')
const cookieParser = require('cookie-parser')
// const ProductManager = require('./ProductManager2');
const products = require('./data.json')
const handlebars = require('express-handlebars')
const productsRouter = require('./routes/products.router')
const cartRouter = require('./routes/carts.router.js')
const {uploader} = require('./utils')
const viewsRouter = require('./routes/views.router')
const {socketProducts} = require ('./public/js/socketProducts')
const app = express()

//___________________________________________________________________________
messages = []

const { Server } = require('socket.io')
const httpServer = app.listen(8080, ()=>{
    console.log("servidor funcionando!")
})

const socketServer = new Server(httpServer)

app.get('/chat', (req, res)=>{
    res.render('chat', {})
})

// socketServer.on('connection', socket=>{
//     console.log("cliente conectado")
// })
socketServer.on('connection', socket => {
    console.log('cliente conectado')
    socket.on('message', data =>{
        console.log(data)
        // messages.push(data)
        // io.emit('messageLogs')
    })
})
//___________________________________________________________________________

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')
app.use('/static' , express.static(__dirname+'/public'))
console.log(__dirname+'/public')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


app.use( (request, response, next)=>{
    console.log("mid a nivel aplicación: time", Date.now())
    next()
})


app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)
app.use('/', viewsRouter)
app.use('/realtimeproducts', viewsRouter)





app.post('/single', uploader.single('myfile'), (req, res)=>{
    res.status(200).send({
        status: 'success',
        message: 'se subió correctamente'
    })

})

socketProducts(socketServer)