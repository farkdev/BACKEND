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
    allowOutsideClick: false
}).then(result => {
    user = result.value
})


chatbox.addEventListener('keyup', evt =>{
    if(evt.key==='Enter'){
        if(chatbox.value.trim().lenght>0){
            socket.emit('message', {
                user, message: chatbox.value
            })
            chatbox.value=''
        }
    }
})

socket.on('messageLogs', data =>{
    // console.log(data)
    let log = document.getElementById('messageLogs')
    let mensajes = ''
    data.forEach({usuario, message}) => {
        mensajes += `<li> ${user}  dice: ${message} </li>`
    })
    log.innerHTML = mensajes
})