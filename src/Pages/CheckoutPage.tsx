import {useContext} from "react";
import CerealDisplay from "../Components/CerealDisplay.tsx";
import {IShoppingCart} from "../Interfaces/IShoppingCart.ts";
import {ShoppingCartContext} from "../ShoppingCartContextProvider.tsx";


const CheckoutPage = () =>
{
    const cart = useContext<IShoppingCart>(ShoppingCartContext);

    return(
        <>
            <h2>Checkout</h2>
            <div className="cereal-display">
                {cart.cartItems && cart.cartItems.length > 0 ? (
                    cart.cartItems.map((cereal) => (
                        <CerealDisplay key={cereal.id} cereal={cereal} isAddButton={false}/>
                    ))
                ) : (
                    <p>No cereals available.</p>
                )}
            </div>
        </>
    )
}

export default CheckoutPage;