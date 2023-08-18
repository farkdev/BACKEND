const { userService, cartService } = require("../service/index");
const { createHash, isValidPassword } = require("../utils/bcryptHash");
const { generateToken, generateResetToken, verifyResetToken } = require("../utils/jwt");
const { logger } = require("../config/logger");
const { sendResetPassMail } = require("../utils/nodemailer");


class UserController {
    login = async (req, res) =>{
        try{
            let {email, password} = req.body
            if (!email || !password) {
                return res.status(400).send({ status: 'error', error: 'El email y la contraseña son obligatorios' })
            }
        
            const userDB = await userService.getUser({email})
            if(!userDB) return res.status(404).send({status: 'error', error: 'usuario incorrecto'})
        
            if(!isValidPassword(password, userDB)) return res.status(401).send({status:'error', error:'contraseña incorrecta'})
            
            const currentDate = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
            await userService.updateUser(userDB._id, currentDate )

            req.session.user ={
                first_name: userDB.first_name,
                last_name: userDB.last_name,
                email: userDB.email,
                date_of_birth: userDB.date_of_birth,
                cart:userDB.cart,
                role: userDB.role
            }
        
            const accessToken = generateToken({
                first_name: userDB.first_name,
                last_name: userDB.last_name,
                email: userDB.email,
                date_of_birth: userDB.date_of_birth,
                cart: userDB.cart,
                role: userDB.role
            })
        
            res.status(302).cookie('coderCookieToken', accessToken, {
                maxAge: 60*60*10000,
                httpOnly: true
            }).redirect('home')
        
        }catch(error){
            logger.error(error)
        }
        
    }

    // login = async (req, res) =>{
    //     try{
    //         let {email, password} = req.body
    //         if (!email || !password) {
    //             return res.status(400).send({ status: 'error', error: 'El email y la contraseña son obligatorios' });
    //         }
        
    //         const userDB = await userService.getUser({email})
    //         if(!userDB) return res.status(404).send({status: 'error', error: 'usuario incorrecto'})
        
    //         if(!isValidPassword(password, userDB)) return res.status(401).send({status:'error', error:'contraseña incorrecta'})
        
    //         req.session.user ={
    //             first_name: userDB.first_name,
    //             last_name: userDB.last_name,
    //             email: userDB.email,
    //             date_of_birth: userDB.date_of_birth,
    //             password: userDB.password,
    //             cart: userDB.cart,
    //             role: userDB.role   
    //         }
        
    //         const accessToken = generateToken({
    //             first_name: userDB.first_name,
    //             last_name: userDB.last_name,
    //             email: userDB.email,
    //             date_of_birth: userDB.date_of_birth,
    //             password: userDB.password,
    //             cart: userDB.cart,
    //             role: userDB.role
    //         })
        
    //         res.cookie('coderCookieToken', token, {
    //             maxAge: 60*60*100,
    //             httpOnly: true,
    //         })
    //         res.redirect('/')
        
    //     }catch(error){
    //         logger.error(error)
    //     }
        
    // }

    register = async (req, res) => {
        try {
            const { first_name, last_name, email, date_of_birth, password } = req.body;
            const existUser = await userService.getUser({ email });
    
            if (existUser) {
                return res.status(400).send({ status: 'error', error: "El email ya se encuentra registrado" });
            }
    
            const newCart = { products: [] };
            const cart = await cartService.createCart(newCart);
    
            let role = 'user';
            if (email === 'premium@premium.com') {
                role = "premium";
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
            };
    
            const userDB = await userService.create(newUser);
    
            res.status(200).send({ status: 'success', payload: userDB });
    
        } catch (error) {
            logger.error(error);
            
        }
    };
    
    logout= async(req,res)=>{
        try {
            const userDB = await userService.getUser({ email: req.session.user.email })
            if (userDB) {
                const currentDate = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
                await userService.updateUser(userDB._id, currentDate )
            }

            req.session.destroy(err=>{
                if(err){res.send({status: 'error', error: err})}
                res.clearCookie('coderCookieToken')
                res.redirect('/api/session/login')
            })
        } catch (error) {
            logger.error(error)
        }
    }
    
    forgotPass = async (req, res) => {
        try {
            let {email} = req.body
            if (!email) return res.status(400).send({ status: 'error', message: 'El email es obligatorio' });
            
            const userDB = await userService.getUser({email})
            if(!userDB) return res.status(404).send({status: 'error', message: 'Usuario inexistente'})

            const resetToken = generateResetToken({userDB})
            const resetLink = `${req.protocol}://${req.get('host')}/resetPassword?token=${resetToken}`
            
            await sendResetPassMail(userDB, resetLink)
            res.send({status:'success', message: 'se envió link para resetear tu password'})
        } catch (error) {
            logger.error(error)
        }
    }
    
    resetPass = async(req, res) => {
        try {
            const { password } = req.body
            const { token } = req.query
            const verifiedToken = verifyResetToken(token)
            if(!verifiedToken){
                return res.status(400).send({status:'error', message:'El enlace de recuperación de contraseña es inválido o ha expirado'})
            }

            const userDB = await userService.getUser({email: verifiedToken.userDB.email})
            if(!userDB) return res.status(404).send({status: 'error', message: 'Usuario inexistente'})
            
            if (isValidPassword(password, userDB)) {
                return res.status(400).send({ status:'error', message:'La contraseña debe ser distinta a la anterior'})
            }

            userDB.password = createHash(password);
            await userDB.save();

            res.send({ status:'success', message:'La contraseña ha sido reemplazada con exito, vuelve a iniciar sesion'});
        } catch (error) {
            logger.error(error)
        }
    }

    changeRole =  async(req, res) => {
        try {
            const userId = req.params.uid
            const userDB = await userService.getUserById(userId)
            if (!userDB) return res.status(404).send({ status: "error", error: "Usuario inexistente" })

            const newRole = userDB.role === "user" ? "premium" : "user";
            userDB.role = newRole
            await userDB.save()
    
            res.send({ status: "success", message: "Rol de usuario actualizado exitosamente", role: newRole })
        } catch (error) {
            logger.error(error)
        }
        

    }
}

module.exports= new UserController()