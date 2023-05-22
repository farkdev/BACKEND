const { Router } = require('express')
const { userModel } = require('../dao/models/user.model')
const {auth} = require('../middlewares/auth.middleware')
const router = Router()




router.get('/',  async (req, res)=>{
    try {
        
        // let users = await userModel.find({first_name: 'Celia'}).explain('executionStats')    
        // let users = await userModel.find({first_name: 'Celia'}).lean()    
        // let users = await userModel.find({})    
        // console.log(users[0]._id.toString())

        // mongoose - paginate 
        const {page=1} = req.query
        let users = await userModel.paginate({}, {limit: 10, page: page, lean: true})
        const {docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages} = users

        // if (!docs) {
            
        // }

        res.render('users',{
            status: 'success',
            users: docs,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage
        })
    } catch (error) {
        console.log(error)
    }
})
//LOGIN DE USUARIO
router.post('/login', async (req,res)=>{
    let {email, password} = req.body
    email = email.trim()
    password = password.trim()
    if(!email || !password){
        return res.status(400).send({status: 'error', message: "Email y contraseña son obligatorios"})
    }
    let role = "user"
    if(email === "adminCoder@coder.com" && password === "adminCod3r123"){
        role = "admin"
    }
    const userDB = await userModel.findOne({email, password})
    if(!userDB) return res.status(404).json({status: "error", message: "Usuario o contraseña incorrecto"})

    req.session.user = {
        first_name: userDB.first_name,
        last_name: userDB.last_name,
        email: userDB.email,
        date_of_birth: userDB.date_of_birth,
        password: userDB.password,
        role: role
    }
    res.redirect('/')
})



// REGISTRO DE USUARIO
router.post('/register', async (req, res)=>{
    try {
        const {first_name, last_name, email, date_of_birth, password }  = req.body
        const existUser = await userModel.findOne({email})
        if(existUser){ 
            return res.send({status:'error', mensaje: "el email ya se encuentra registrado"})
        }

        const newUser = {
            first_name, 
            last_name,
            email,
            date_of_birth,
            password,
            title: "Register"
        } 
        
        await userModel.create(newUser) 

        
        res.status(200).json({ status: 'success', message: 'Registro exitoso' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });

    }
    
})

router.get('/logout', async (req, res) =>{
    req.session.destroy(err=> {
        if(err){
            res.send({status: 'error', error: err})
        }
        res.redirect('login')
    })
})



router.delete('/:uid', async (req, res) => {
    try {
        let {uid} = req.params
        // buscar por pid user
    
        let result = await userModel.deleteOne({_id: uid})
        res.send({status: 'success', payload: result})
        
    } catch (error) {
        console.log(error)
    }
})

router.get('/counter', (req,res)=>{
    if(req.session.counter){
        req.session.counter++
        res.send(`se ha visitado el sitio ${req.session.counter} veces`)
    }else{
        req.session.counter =1
        res.send('Bienvenido')
    }
})

// router.get('/private', auth,(req,res)=>{
//     res.send('Only admin')
// })




module.exports = router