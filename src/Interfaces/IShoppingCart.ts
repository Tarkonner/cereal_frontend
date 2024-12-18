import {Cereal} from "./Cereal.ts";


export interface IShoppingCart {
    cartCount : number
    addToCart : (cereal : Cereal) => boolean
    getCartItems : () => Cereal[]
    clearCart : () => boolean
    removeFromCart : (cereal : Cereal) => boolean
}