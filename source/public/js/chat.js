

console.log("Socket")
const socket = io()
let user
let chatbox = document.querySelector('#chatbox')

Swal.fire({
    title: "Identificate",
    input: 'text',
    text: 'Ingresa el nombre de usuario',
    inputValidator: (value)=>{
        return !value && 'el nombre de usuario es obligatorio'
    },
    allowOutsideClick: false,
    allowEscapeKey: false
}).then(result => {
    user = result.value
    socket.emit('authenticated', user)
})


document.getElementById('messageForm').addEventListener('submit', evt => {
    evt.preventDefault();
    if(chatbox.value.trim().length>0){
        socket.emit('message', {
            user, message: chatbox.value
        })
        chatbox.value=''
    }
})


socket.on('message', message => {
    let log = document.getElementById('messageLogs')
    let mensajes = log.innerHTML
    mensajes += `<li> ${message.user}  dice: ${message.message} </li>`
    log.innerHTML = mensajes
  })
  

socket.on('newUserConnected', user => {
    if (!user) {
        return 
    }

    Swal.fire({
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
        timer: 10000,
        title: `${user} se a unido al chat`,
        icon: 'success'
    })
})
