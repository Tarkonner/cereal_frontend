import {Cereal} from "./Interfaces/Cereal.ts";

const cartContentKey: string = "cartContentKey";

export class ShoppingCart {

    public addToCart(cereal: Cereal): void {
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
        } catch (error) {
            console.error("An error occurred while adding to the cart:", error);
        }
    }

    // Method to get all cereal objects from the cart
    public getCartItems(): Cereal[] {
        try {
            const cartData = localStorage.getItem(cartContentKey);
            return cartData ? JSON.parse(cartData) : [];
        } catch (error) {
            console.error("An error occurred while retrieving the cart:", error);
            return [];
        }
    }

    public getCartItemCount() : number {
        const cartData = localStorage.getItem(cartContentKey);

        if(cartData != null) {
            // Parse the data if it's JSON
            const parsedData = JSON.parse(cartData);
            // Check if it's an array and get the length
            if (Array.isArray(parsedData)) {
                return (parsedData.length);
            }
                else
                    return 0;
        }
            else return 0;
    }

    // Method to clear the cart
    public clearCart(): void {
        try {
            localStorage.removeItem(cartContentKey);
            console.log("Cart cleared.");
        } catch (error) {
            console.error("An error occurred while clearing the cart:", error);
        }
    }
}

