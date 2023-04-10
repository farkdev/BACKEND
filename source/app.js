const express = require('express')
const cookieParser = require('cookie-parser')
// const ProductManager = require('./ProductManager2');
const products = require('./data.json')
const handlebars = require('express-handlebars')
const productsRouter = require('./routes/products.router')
const cartRouter = require('./routes/carts.router')
const {uploader} = require('./utils')
const app = express()
 

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









app.post('/single', uploader.single('myfile'), (req, res)=>{
    res.status(200).send({
        status: 'success',
        message: 'se subió correctamente'
    })

})









app.get('/vista', (request, response)=>{
    let user = users[Math.floor(Math.random () * users.length)]
    let testUser = {
        title: 'Tienda',
        user,
        isAdmin: user.role ==='admin',
        food
    }


    response.render('index', testUser)
})




app.listen(8080, ()=>{
    console.log("servidor funcionando!")
})
