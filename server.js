const http = require('http')

const server = http.createServer((request, response) =>{
    response.end("mi primer servidor!")
})

server.listen(8080, ()=>{
    console.log("escuchando al port 8080!")
})