const { Router } = require('express')
const { userModel } = require('../dao/models/user.model')
const {auth} = require('../middlewares/auth.middleware')
const { createHash, isValidPassword } = require('../utils/bcryptHash')
const passport = require('passport')
const router = Router()



router.get('/',  async (req, res)=>{
    try {
        const {page=1} = req.query
        let users = await userModel.paginate({}, {limit: 10, page: page, lean: true})
        const {docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages} = users
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
    const userDB = await userModel.findOne({email})
    if(!userDB) return res.status(404).json({status: "error", message: "Usuario o contraseña incorrecto"})
    if(!isValidPassword(password, userDB)) return res.status(401).send({status: "error", message: "el usuario o contraseña no es correcta"})
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
            return res.send({status:'error', mensaje: "El email ya se encuentra registrado"})
        }
        const newUser = {
            first_name, 
            last_name,
            email,
            date_of_birth,
            password: createHash(password),
            title: "Register"
        } 
        await userModel.create(newUser) 
        res.status(200).json({ status: 'success', message: 'Registro exitoso' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
})











// LOGIN GITHUB


router.post('/login', passport.authenticate('login', {failureRedirect: '/faillogin'}), async (req,res)=>{
    if (!req.user) return res.status(401).send({status: 'error', message: "credenciales incorrectas"})
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name, 
        email: req.user_email

    }
    res.send({status: 'success', message: "Iniciaste sesión"})
})



router.post('/register', passport.authenticate('register', {
    failureRedirect: '/failregister',
}), async (req,res)=>{
    res.send({status: 'success', message: "Usuario registrado"})
})

router.get('/github', passport.authenticate('github', {scope:['user:email']}))

router.get('/githubcallback',passport.authenticate('github',{failureRedirect:'/login'}), async(req,res)=>{
    req.session.user=req.user
    res.redirect('/')
})







//LOGIN JWT

// router.post('/login', async (req,res)=>{
//         let {email, password} = req.body
//         email = email.trim()
//         password = password.trim()
//         if(!email || !password){
//             return res.status(400).send({status: 'error', message: "Email y contraseña son obligatorios"})
//         }
//         let role = "user"
//         if(email === "adminCoder@coder.com" && password === "adminCod3r123"){
//             role = "admin"
//         }
//         const userDB = await userModel.findOne({email})
//         if(!userDB) return res.status(404).json({status: "error", message: "Usuario o contraseña incorrecto"})
//         if(!isValidPassword(password, userDB)) return res.status(401).send({status: "error", message: "el usuario o contraseña no es correcta"})
//         req.session.user = {
//             first_name: userDB.first_name,
//             last_name: userDB.last_name,
//             email: userDB.email,
//             date_of_birth: userDB.date_of_birth,
//             password: userDB.password,
//             role: role
//         }
//         res.redirect('/')
//     })

// router.post('/register', passport.authenticate('register', {
//     failureRedirect: '/failregister',
// }), async (req,res)=>{
//     res.send({status: 'success', message: "Usuario registrado"})
// })






router.get('/faillogin', async(req,res)=>{
    console.log('fallo login')
    res.send({status: 'error', message:'fallo autenticacion'})
})
router.get('/failregister', async(req,res)=>{
    console.log('fallo')
    res.send({status: 'error', message:'fallo autenticacion'})
})





router.post('/recoverpass', async (req, res)=>{
    const {email, password} = req.body
    const userDB = await userModel.findOne({email})
    if(!userDB) {
        return status(401).send({status: error, message: "Usuario no existe"})
    }
    userDB.password = createHash(password)
    await userDB.save()
    res.status(200).send({status: "success", message: "Contraseña actualizada correctamente"})
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