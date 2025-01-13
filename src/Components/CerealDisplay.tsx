import { useState, useEffect, useContext } from 'react';
import { Cereal } from "../Interfaces/Cereal"; // Interface for the cereal object
import styles from "./CerealDisplay.module.css"; // CSS module for styling
import { fetchImage } from "../API_Calles.ts"; // Function to fetch cereal images
import { ShoppingCartContext } from "../ShoppingCartContextProvider.tsx"; // Context for shopping cart management
import { IShoppingCart } from "../Interfaces/IShoppingCart.ts"; // Interface for the shopping cart context

// Component for displaying individual cereal information
const CerealDisplay = ({ cereal, isAddButton }: { cereal: Cereal, isAddButton: boolean }) => {
    // State to store the cereal image data
    const [imageData, setImageData] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true); // State for loading status
    const [showMoreInfo, setShowMoreInfo] = useState(false); // State for toggling additional cereal info

    // Toggles the visibility of additional cereal info
    const toggleInfo = () => {
        setShowMoreInfo(!showMoreInfo);
    };

    // Fetches the cereal image on component mount or when `cereal.id` changes
    useEffect(() => {
        const fetchCerealImage = async () => {
            try {
                const response = await fetchImage(cereal.id); // Fetch image using cereal ID
                setImageData(response); // Set the fetched image data
                setIsLoading(false); // Set loading to false after fetch
            } catch (error) {
                console.error('Error fetching cereal image:', error); // Log errors to the console
                setIsLoading(false); // Set loading to false even on error
            }
        };

        fetchCerealImage();
    }, [cereal.id]);

    // Access the shopping cart context
    const cart = useContext<IShoppingCart>(ShoppingCartContext);

    return (
        <>
            <div className={styles.cerealDisplay}>
                {/* Cereal Name */}
                <span className={`${styles.cerealtTitle} ${styles.name} ${styles.bold}`}>{cereal.name}</span>

                {/* Cereal Image */}
                <div className={styles.image}>
                    {isLoading ? (
                        <p>Loading...</p> // Displayed while the image is being fetched
                    ) : imageData ? (
                        <img
                            src={imageData}
                            className={styles.responsiveImage}
                            alt={`Image of ${cereal.name}`}
                        /> // Displays the fetched image
                    ) : (
                        <p>Error loading</p> // Displayed if image fetch fails
                    )}
                </div>

                {/* Cereal Manufacturer and Rating */}
                <div>
                    <div className={styles.manufactor}>
                        <p>Type: {cereal.type}</p>
                        <p>From: {cereal.manufacturer}</p>
                        <span className={styles.rating}>{cereal.rating}</span>
                    </div>
                </div>

                {/* Add/Remove Button */}
                {
                    isAddButton ? (
                        <button className={styles.buy} onClick={() => cart.addToCart(cereal)}>Add to Cart</button>
                    ) : (
                        <button onClick={() => cart.removeFromCart(cereal)}>Remove from Cart</button>
                    )
                }

                {/* Show More/Less Info Button */}
                <button className={styles.infoButton} onClick={toggleInfo}>
                    {showMoreInfo ? "Show less" : "Show more"}
                </button>

                {/* Additional Cereal Info */}
                {showMoreInfo && (
                    <div className={styles.info}>
                        <p>Calories: {cereal.calories}</p>
                        <p>Carbohydrates: {cereal.carbohydrates}</p>
                        <p>Fat: {cereal.fat}</p>
                        <p>Protein: {cereal.protein}</p>
                        <p>Fiber: {cereal.fiber}</p>
                        <p>Sugars: {cereal.sugars}</p>
                        <p>Potassium: {cereal.potassium}</p>
                        <p>Sodium: {cereal.sodium}</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default CerealDisplay;
