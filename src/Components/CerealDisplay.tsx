import { useState, useEffect, useContext } from 'react';
import { Cereal } from "../Interfaces/Cereal"; // Interface for the cereal object
import styles from "./CerealDisplay.module.css"; // CSS module for styling
import {fetchImage, fetchNutritionLabel} from "../API_Calles.ts"; // Function to fetch cereal images
import { ShoppingCartContext } from "../ShoppingCartContextProvider.tsx"; // Context for shopping cart management
import { IShoppingCart } from "../Interfaces/IShoppingCart.ts"; // Interface for the shopping cart context

// Component for displaying individual cereal information
const CerealDisplay = ({ cereal, isAddButton }: { cereal: Cereal, isAddButton: boolean }) => {
    // State to store the cereal image data
    const [imageData, setImageData] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true); // State for loading status
    const [showMoreInfo, setShowMoreInfo] = useState(false); // State for toggling additional cereal info
    const [nutritionLabel, setNutritionLabel] = useState<string[]>([]);

    // Toggles the visibility of additional cereal info
    const toggleInfo = async () => {
        setShowMoreInfo(!showMoreInfo);
        if (nutritionLabel.length <= 0) {
            try {
                const nutritionData = await fetchNutritionLabel(cereal.id); // Fetch additional info
                console.log("Fetched nutrition data:", nutritionData);

                // Transform the object into an array of strings
                if (nutritionData && typeof nutritionData === "object") {
                    const formattedData = Object.entries(nutritionData).map(
                        ([key, value]) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`
                    );
                    setNutritionLabel(formattedData);
                } else {
                    console.error("Nutrition data is not an object:", nutritionData);
                    setNutritionLabel([]); // Reset to empty array if data is invalid
                }
            } catch (error) {
                console.error("Error fetching nutrition info:", error);
                setNutritionLabel([]); // Reset to empty array on error
            }
        }
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

                {showMoreInfo && (
                    <div className={styles.info}>
                        {nutritionLabel.length > 0 ? (
                            <ul>
                                {nutritionLabel.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default CerealDisplay;
