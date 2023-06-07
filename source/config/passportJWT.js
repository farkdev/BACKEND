const passport = require('passport')
const passportJWT = require('passport-jwt')
const configServer = require('../config/objectConfig')

const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

const cookieExtractor = (req) =>{
    let token = null
    if (req && req.cookies){
        token = req.cookies['coderCookieToken']
    }
    return token
}

const configStrategy = {
    jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
    secretOrKey: configServer.jwt_private_key
}

const initializePassport= ()=>{
    passport.use('current', new JWTStrategy(configStrategy, async(jwt_payload, done)=>{
        try {
            return done(null, jwt_payload)
        } catch (error) {
            console.log(error)
        }
    }))
}


module.exports = {
    initializePassport
}