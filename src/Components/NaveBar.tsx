import styles from "./NavaBar.module.css"
import {ShoppingCart} from "../ShoppingCart.ts";
import {useEffect, useState} from "react";

const cart = new ShoppingCart();



const NaveBar = () => {
    const [cartCount, setCartCount] = useState(0);

    useEffect(() =>
    {
        setCartCount(cart.getCartItemCount());
    }, [cartCount]);

    return (
        <nav className={styles.header}>
            <a href="/home">Home</a>
            <a href="/checkout">Checkout</a>
            <h1 className="Cereal">Cereal database</h1>
            <h3>Cart: {cartCount}</h3>
        </nav>
    )
}

export default NaveBar;