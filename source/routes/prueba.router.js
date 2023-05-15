const  {Router} = require('express')
const router = Router


// router.get('/setCookie', (req, res)=>{
//     res.cookie('CoderCookie', "cookie poderosa", {maxAge: 10000000}).send("cookie seteada")
// })


// router.get('/getCookie', (req, res)=>{
//     res.send(req.cookies)
// })
// router.get('setSignedCookie', (req,res) =>{
//     res.send(req.signedCookies)
// })



//sesiones

// router.get('/session', (req, res)=>{
//   if (req.session.counter) {
//         req.session.counter ++
//         res.send(`se ha visitado el sitio ${req.session.counter} veces`)
//   } else {
//     req.session.counter = 1
//     res.send('Bienvenido')
//   }
// })