import Cart from "./Cart"

export const addItemToCart = (item,next) =>
{
    let cart = [] 
    if(typeof window!==undefined){
        if(localStorage.getItem("cart")){
            cart=JSON.parse(localStorage.getItem("cart"))
        }
        cart.push({
            ...item,
            count:1
        })
        localStorage.setItem("cart",JSON.stringify(cart))
        next()
    }
}

export const loadCart = () =>
{
    if(typeof window!==undefined){
        if(localStorage.getItem("cart")){
            return JSON.parse(localStorage.getItem("cart"))
        }
    }
}

export const removeItemFromCart = (id) => 
{
    let cart=[]
    if(typeof window!==undefined){
        if(localStorage.getItem("cart")){
            cart= JSON.parse(localStorage.getItem("cart"))
        }
        cart.map((book,i) => {
            if(book.bookId===id){
            cart.splice(i,1)}
        })
        localStorage.setItem("cart",JSON.stringify(cart))
    }
    
    return cart;
}

export const emptyCart = next => 
{
    if(typeof window!==undefined){
            localStorage.removeItem("cart")
            next()
        }
}