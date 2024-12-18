import React, {useState, useEffect, useContext} from 'react';
import { Cereal } from "../Interfaces/Cereal";
import styles from "./CerealDisplay.module.css"
import {fetchImage} from "../API_Calles.ts";
import {ShoppingCartContext} from "../ShoppingCartContextProvider.tsx";
import {IShoppingCart} from "../Interfaces/IShoppingCart.ts";

interface CerealProps {
    cereal: Cereal;
    isAddButton : boolean;
}

const CerealDisplay: React.FC<CerealProps> = ({ cereal, isAddButton }) => {
    const [imageData, setImageData] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showMoreInfo, setShowMoreInfo] = useState(false);

    const toggleInfo = () => {
        setShowMoreInfo(!showMoreInfo);
    };

    useEffect(() => {
        const fetchCerealImage = async () => {
            try {
                const response = await fetchImage(cereal.id);
                setImageData(response);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching cereal image:', error);
                setIsLoading(false);
            }
        };

        fetchCerealImage();
    }, [cereal.id]);

    // React component
    const cart = useContext<IShoppingCart>(ShoppingCartContext);


    return (
        <>
            <div className={styles.cerealDisplay}>
                <div className={styles.imageColumn}>
                    {isLoading ? (
                        <p>loading...</p>
                    ) : imageData ? (
                        <img src={imageData} className={styles.responsiveImage}/>
                    ) : (
                        <p>error loading</p>
                    )}
                </div>
                <div>
                    <span className={`${styles.name} ${styles.bold}`}>{cereal.name}</span>
                    <div className={styles.info}>
                        <p>Type: {cereal.type}</p>
                        <p>From: {cereal.manufacturer}</p>
                    </div>
                </div>
                <span className={styles.rating}>{cereal.rating}</span>
                {
                    isAddButton ?
                        (<button onClick={() => cart.addToCart(cereal)}>Add to Cart</button>)
                        :
                        (<button onClick={() => cart.removeFromCart(cereal)}>Remove from Cart</button>)
                }
                <div>
                    <button onClick={toggleInfo}>
                        {showMoreInfo ? "Show less" : "Show more"}
                    </button>
                    {showMoreInfo && (
                        <div>
                            <p>calories: {cereal.calories}</p>
                            <p>carbohydrates: {cereal.carbohydrates}</p>
                            <p>fat: {cereal.fat}</p>
                            <p>protein: {cereal.protein}</p>
                            <p>fiber: {cereal.fiber}</p>
                            <p>sugars: {cereal.sugars}</p>
                            <p>potassium: {cereal.potassium}</p>
                            <p>sodium :{cereal.sodium}</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};


export default CerealDisplay;