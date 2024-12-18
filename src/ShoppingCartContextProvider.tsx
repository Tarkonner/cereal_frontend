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

    const removeFromCart = (item: Cereal) : boolean => {
        try {
            // Retrieve existing cart data from localStorage
            const cartData = localStorage.getItem(cartContentKey);
            const cart: Cereal[] = cartData ? JSON.parse(cartData) : [];

            // Find the index of the item to remove
            const index = cart.findIndex(c => c.id === item.id);

            if (index !== -1) {
                // Remove the item from the cart
                cart.splice(index, 1);

                // Update localStorage with the modified cart
                localStorage.setItem(cartContentKey, JSON.stringify(cart));

                // Update the cart count
                setCartCount(getCartItemCount());

                console.log(`Removed ${item.name} from the cart.`);
                return true; // Successfully removed the item
            } else {
                console.log(`Item with ID ${item.id} not found in the cart.`);
                return false; // Item not found
            }
        } catch (error) {
            console.error("An error occurred while removing the item:", error);
            return false; // Failed to remove the item
        }
    }

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
            clearCart,
            removeFromCart,
        }
    }>
        {children}
    </ShoppingCartContext.Provider>)

};

export default ShoppingCartContextProvider;