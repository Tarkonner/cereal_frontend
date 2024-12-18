import styles from "./NavaBar.module.css"
import {Link} from "react-router-dom";
import {useContext} from "react";
import {IShoppingCart} from "../Interfaces/IShoppingCart.ts";
import {ShoppingCartContext} from "../ShoppingCartContextProvider.tsx";


const NaveBar = () => {

    const cart = useContext<IShoppingCart>(ShoppingCartContext);


    return (
        <>
            <nav className={styles.header}>
                <h1 className="Cereal">Cereal database</h1>
                <Link to="/home">Home</Link>
                <Link to="/checkout">Checkout</Link>
                <h3>Cart: {cart.cartCount}</h3>
            </nav>
            <div style={{height: "270px"}}>

            </div>
        </>
    )
}

export default NaveBar;