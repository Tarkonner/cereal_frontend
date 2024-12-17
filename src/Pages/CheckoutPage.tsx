import {useEffect, useState} from "react";
import {ShoppingCart} from "../ShoppingCart.ts";
import {Cereal} from "../Interfaces/Cereal.ts";
import CerealDisplay from "../Components/CerealDisplay.tsx";


const cart = new ShoppingCart();

const CheckoutPage = () =>
{
    const [choosenCereal, setChoosenCereal] = useState<Cereal[]>([])


    useEffect(() =>  {
        setChoosenCereal(cart.getCartItems());
    });

    return(<>
            <h2>Checkout</h2>
            <div className="cereal-display">
                {choosenCereal.map((cereal) => (
                    <CerealDisplay key={cereal.id} cereal={cereal}/>
                ))}
            </div>
        </>
    )
}

export default CheckoutPage;