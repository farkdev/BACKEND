const express = require('express')
const cookieParser = require('cookie-parser')
const products = require('./data.json')
const handlebars = require('express-handlebars')
const {uploader} = require('./utils/multer')
const {socketProducts} = require ('./public/js/socketProducts')
const app = express()
const objectConfig  = require('./config/objectConfig')
const routerServer = require('../source/routes/index.router')
const session = require('express-session')
const cookie = require('./routes/prueba.router')
const MongoStore = require('connect-mongo')
const { initPassportMid, initPassportGithub } = require('./config/passport.config')
const passport = require('passport')
const  {initializePassport}  = require('../source/config/passportJWT')
const { errorHandler } = require('./middlewares/err.middleware')

const PORT =  process.env.PORT;

const { addLoger, logger } = require('./config/logger')

app.use(addLoger)


//___________________________________________________________________________
messages = []
const messageManager = require('./dao/mongo/chat.mongo')

const { Server } = require('socket.io')





const httpServer = app.listen(PORT, () => {
    logger.info(`Servidor funcionando en puerto: ${PORT}`)
})

const socketServer = new Server(httpServer)

socketServer.on('connection', socket => {
    console.log('Cliente conectado')
    socket.on('message', data =>{
        console.log(`Mensaje recibido ${data.message}`)
        const message = {
            user: data.user,
            message: String(data.message),
            
        }
        messageManager.saveMessage(message.user, message.message)
        socket.broadcast.emit("message", message);

    })

    messageManager.allMessages().then(messages => {
        socketServer.emit('messageLogs', messages);
    })

})

app.get('/chat', (req, res)=>{
    res.render('chat', {})
})
//___________________________________________________________________________

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')


app.use('/static' , express.static(__dirname+'/public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cookieParser())

objectConfig.connectDB()

initializePassport()
// initPassportMid()
initPassportGithub()
passport.use(passport.initialize())
passport.use(passport.session())


//cookies
app.use('/prueba', (req, res)=>{
    res.render('prueba')
})
app.use(cookieParser('CoderS3CR3T0'))
// app.get('/cookie', (req, res) => {
//     const name = req.query.name;
//     const email = req.query.email;
//     const cookie = `name=${name}; email=${email}`;
//     res.cookie('myCookie', cookie);
//     res.json({ cookie });
// })

app.use(session({
	store: MongoStore.create({
		ttl: 100000 * 60,
		mongoUrl: 'mongodb+srv://farkdev:coderhouse@cluster0.p2tsobu.mongodb.net/?retryWrites=true&w=majority',
		mongoOptions: {
			useNewUrlParser: true,
			useUnifiedTopology: true
		}

	}),
	secret: 'secretCoder',
	resave: false,
	saveUninitialized: false
}))

app.use(cookie)
app.use(routerServer)
app.use(errorHandler)



app.post('/single', uploader.single('myfile'), (req, res)=>{
    res.status(200).send({
        status: 'success',
        message: 'se subió correctamente'
    })

})






socketProducts(socketServer)