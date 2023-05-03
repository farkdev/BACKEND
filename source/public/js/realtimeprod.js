const socket = io()

let form = document.querySelector('.formProduct')

form.addEventListener('submit', evt => {
    evt.preventDefault()
    let title = form.elements.title.value
    console.log(title)
        if(title != ''){
            socket.emit('addProduct', {
             title
            })
        }
    form.reset()


})


socket.on('productos', data =>{
    console.log(data)
    let logs=''
    let div = document.getElementById('listaProductos')
    // let productos = []
    // data.forEach(product => {
    //     productos += `<div>${product.titulo} precio: ${product.precio}</div>`
    //     div.innerHTML=productos
    // });








    data.forEach(el => {
        logs += `   <li><b>ID: ${el.id}</b></li>
                    <li>Title: ${el.titulo}</li>
                    <li>Description: ${el.descripcion}</li>
                    <li>Price: ${el.precio}</li>
                    <li>Thumbnails: ${el.thumbnail}</li>
                    <li>Stock: ${el.stock}</li>
                    <li>Code: ${el.code}</li>
                    <hr>`
    });

    div.innerHTML=logs
})
