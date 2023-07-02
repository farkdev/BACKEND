const nodemailer = require('nodemailer')
const config     = require('../config/objectConfig')




const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.gmail_user_app,    
        pass: config.gmail_pass_app
    }
})


exports.sendMail = async (body)=>{
    return await transport.sendMail({
        from: 'COMPRA REALIZADA <frojaskonrath@gmail.com>',
        to: 'frojaskonrath@gmail.com',
        subject: 'Gracias por elegirnos',
        html: `<div>
        <h1>Tu compra ha sido confirmada</h1>
        <p>Codigo: ${body.code} </p>
        <p>Total: ${body.amount}$ </p>
        </div>`
    })
}