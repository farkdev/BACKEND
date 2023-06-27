const fs = require('fs')

class CartManager {
    constructor(){
        this.cart = []
        this.path = './cart.json'
        
    }

    exists() {
        /* verifico si existe el archivo */
        try {
            if (!fs.existsSync(this.path)) {
                throw new Error("The file does not exists");
            } else {
                return true;
            }
        } catch (error) {
            console.log(`Error looking for the file: ${error.message}`);
        }
    }
    
    readCart = async() =>{
        try{
            const data = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(data)
        } catch (error) {
            console.log(error)
        }         
    }

    writeCart = async(data)=>{
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(data,null,2))
        } catch (err){
            console.log(err)
        }
    }

    

    createCart = async () => {
        try{
            let cartsArray = []
            if(!this.exists(this.cart)){
                let cartArray=[]
                const cart = {
                    id: this.#idGen(),
                    products: []
                }
                cartArray.push(cart)
                await this.writeCart(cartArray)
                console.log(`El carrito fue agregado con el id: ${cart.id}`)
                return cart.id

            } else {
                if(await this.readCart(this.path)){
                    cartsArray = await this.readCart(this.path)
                }
                if(cartsArray.length === 0 || !cartsArray){
                    const cart = {
                        id: this.#idGen(),
                        products: []
                    }
                    cartsArray.push(cart)
                } else {
                    const cart = {
                        id: this.#idGen(cartsArray),
                        products: []
                    }
                    cartsArray.push(cart)
                }
                await this.writeCart(cartsArray)
                console.log(`El carrito fue adherido con el id ${cart.id}`)
                return cart
            }

        } catch (error) {
            console.log(`Error adhiriendo los productos ${error.message}`)
        }
    }

    getCartById = async id => {
        try {
            if(this.exists(this.path)){
                const carts = await this.readCart()
                const cart = carts.find(item => item.id === id)
                return cart ? cart : console.log('No se halló el producto')
        }
        return console.log('The database not exist')
        } catch (error) {
            console.log(error);
        }
    }

    addToCart = async (cid, pid) => {
        try {
            if(this.exists(this.path)) {
                const carts = await this.readCart()
                const cart = carts.find(item => item.id === cid)
                if(cart) {
                    const addProduct = cart.products.find(item => item.id === pid)
                    if(addProduct) {
                    addProduct.quantity++
                    } else {
                        cart.products.push({id: pid, quantity: 1 })
                    }
                    await this.writeCart(carts)
                    this.cart = cart
                    return this.cart
                }
            throw new Error(`The cart with the id was not found: ${cid}`)
            }
        } catch (error) {
            console.log(error);
        }
    }

    #idGen(productsArray = []) {
        const id =
        productsArray.length === 0
            ? 1
            : productsArray[productsArray.length - 1].id + 1;
        return id;
    }

}


module.exports = CartManager