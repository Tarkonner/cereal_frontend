import {Cereal} from "./Cereal.ts";


export interface IShoppingCart {
    //Variables
    cartCount : number
    cartItems : Cereal[]

    //Functions
    addToCart : (cereal : Cereal) => boolean
    getCartItems : () => void
    clearCart : () => boolean
    removeFromCart : (cereal : Cereal) => boolean
}