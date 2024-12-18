import { Cereal } from "./Interfaces/Cereal";
import {createContext, ReactNode, useEffect, useState} from "react";
import {IShoppingCart} from "./Interfaces/IShoppingCart.ts";

const cartContentKey: string = "cartContentKey";

export const ShoppingCartContext = createContext<IShoppingCart>({} as IShoppingCart);

const ShoppingCartContextProvider = ({children}: {children: ReactNode}) => {
    const [cartCount, setCartCount] = useState(0);

    const addToCart = (cereal: Cereal): boolean => {
        try {
            // Retrieve existing cart data from localStorage
            const cartData = localStorage.getItem(cartContentKey);
            const cart: Cereal[] = cartData ? JSON.parse(cartData) : [];

            // Check if the cereal already exists in the cart
            const existingCereal = cart.find(item => item.id === cereal.id);

            if (existingCereal) {
                // Update quantity if the cereal already exists
            } else {
                // Add new cereal to the cart
                cart.push(cereal);
            }

            // Save updated cart back to localStorage
            localStorage.setItem(cartContentKey, JSON.stringify(cart));

            // Update cart count
            setCartCount(getCartItemCount());
        } catch (error) {
            console.error("An error occurred while adding to the cart:", error);
        }

        setCartCount(getCartItemCount());

        return true;
    };

    const getCartItems = (): Cereal[] => {
        try {
            const cartData = localStorage.getItem(cartContentKey);
            return cartData ? JSON.parse(cartData) : [];
        } catch (error) {
            console.error("An error occurred while retrieving the cart:", error);
            return [];
        }
    };

    const getCartItemCount = (): number => {
        const cartData = localStorage.getItem(cartContentKey);

        if (cartData != null) {
            const parsedData = JSON.parse(cartData);
            if (Array.isArray(parsedData)) {
                return parsedData.length;
            }
            return 0;
        }
        return 0;
    };

    const clearCart = (): boolean => {
        try {
            localStorage.removeItem(cartContentKey);
            setCartCount(0); // Reset cart count
            console.log("Cart cleared.");
            return true;
        } catch (error) {
            console.error("An error occurred while clearing the cart:", error);
            return false;
        }
    };

    useEffect(() =>
    {
        setCartCount(getCartItemCount());
    }, []);

    return (<ShoppingCartContext.Provider value={
        {
            cartCount,
            addToCart,
            getCartItems,
            clearCart
        }
    }>
        {children}
    </ShoppingCartContext.Provider>)

};

export default ShoppingCartContextProvider;