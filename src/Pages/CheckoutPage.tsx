import {useContext, useEffect, useState} from "react";
import CerealDisplay from "../Components/CerealDisplay.tsx";
import {IShoppingCart} from "../Interfaces/IShoppingCart.ts";
import {ShoppingCartContext} from "../ShoppingCartContextProvider.tsx";
import {Cereal} from "../Interfaces/Cereal.ts";


const CheckoutPage = () =>
{
    const cart = useContext<IShoppingCart>(ShoppingCartContext);
    const [collectedCereal, setCollectedCereal] = useState<Cereal[]>()

    useEffect(() =>  {
        setCollectedCereal(cart.getCartItems());
    }, []);

    return(
        <>
            <h2>Checkout</h2>
            <div className="cereal-display">
                {collectedCereal && collectedCereal.length > 0 ? (
                    collectedCereal.map((cereal) => (
                        <CerealDisplay key={cereal.id} cereal={cereal}/>
                    ))
                ) : (
                    <p>No cereals available.</p>
                )}
            </div>
        </>
    )
}

export default CheckoutPage;