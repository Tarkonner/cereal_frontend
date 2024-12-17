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
        <>
            <nav className={styles.header}>
                <a className="Cereal">Cereal database</a>
                <p>{cartCount}</p>
            </nav>

        </>
    )
}

export default NaveBar;