const { cartService } = require("../service/index")
const { userModel } = require("../dao/mongo/models/user.model")
const { createHash, isValidPassword } = require('../utils/bcryptHash')
const { generateToken } = require("../utils/jwt")


const { userService  }= require('../service/index') 


class SessionController {

    login = async (req, res) =>{
        let {email, password} = req.body
        email = email.trim()
        password = password.trim()
        if (!email || !password){
            return res.status(400).send({status: 'error', message: "Email y contraseña son obligatorios"})
        }
        
        
        const userDB = await userService.getUser({email})
        if(!userDB) return res.status(404).json({status: "error", message: "Usuario o contraseña incorrecto"})
        
        if(!isValidPassword(password, userDB)) return res.status(401).send({status: "error", message: "el usuario o contraseña no es correcta"})
        
        req.session.user = {
            first_name: userDB.first_name,
            last_name: userDB.last_name,
            email: userDB.email,
            date_of_birth: userDB.date_of_birth,
            password: userDB.password,
            cart: userDB.cart,
            role: userDB.role
        }

        const token = generateToken({
            first_name: userDB.first_name,
            last_name: userDB.last_name,
            email: userDB.email,
            date_of_birth: userDB.date_of_birth,
            password: userDB.password,
            cart: userDB.cart,
            role: userDB.role
        })
        res.cookie('coderCookieToken', token, {
            maxAge: 60*60*100,
            httpOnly: true,
        })
        res.redirect('/login')
    }

    register = async (req, res)=>{
    
        const {first_name, last_name, email, date_of_birth, password }  = req.body
        const existUser = await userService.getUser({email})
        if(existUser){ 
            return res.send({status:'error', mensaje: "El email ya se encuentra registrado"})
        }
        const newCart = {products: []}
        const cart = await cartService.createCart(newCart)

        let role = userModel.schema.path('role').default()
    
        if(email === "adminCoder@coder.com" && password === "adminCod3r123"){
        role = "admin"
        }
        
        const newUser = {
            first_name, 
            last_name,
            email,
            date_of_birth,
            cart: cart._id,
            role: role,
            password: createHash(password),
            title: "Register"
        } 
        await userService.create(newUser) 

        const accesTok = generateToken({
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            date_of_birth: newUser.date_of_birth,
            cart: newUser.cart,
            role: newUser.role
        })

        res.cookie('coderCookieToken', accesTok, {
            maxAge: 60*60*100,
            httpOnly: true,
        }).send({status: "success", message: 'Registro hecho'})
    }
        
    logout = (req, res) =>{
    req.session.destroy(err=> {
        if(err){
            res.send({status: 'error', error: err})
        }
        res.redirect('/login')
    })
    }
}





module.exports = new SessionController()
