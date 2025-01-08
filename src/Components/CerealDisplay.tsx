import {useState, useEffect, useContext} from 'react';
import { Cereal } from "../Interfaces/Cereal";
import styles from "./CerealDisplay.module.css"
import {fetchImage} from "../API_Calles.ts";
import {ShoppingCartContext} from "../ShoppingCartContextProvider.tsx";
import {IShoppingCart} from "../Interfaces/IShoppingCart.ts";


const CerealDisplay = ({ cereal, isAddButton }: {cereal: Cereal, isAddButton : boolean}) => {
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
                <span className={`${styles.cerealtTitle} ${styles.name} ${styles.bold}`}>{cereal.name}</span>
                <div className={styles.image}>
                    {isLoading ? (
                        <p>loading...</p>
                    ) : imageData ? (
                        <img src={imageData} className={styles.responsiveImage} alt={`Image of ${cereal.name}`}/>
                    ) : (
                        <p>error loading</p>
                    )}
                </div>
                <div>

                    <div className={styles.manufactor}>
                        <p>Type: {cereal.type}</p>
                        <p>From: {cereal.manufacturer}</p>
                        <span className={styles.rating}>{cereal.rating}</span>
                    </div>
                </div>
                {
                    isAddButton ?
                        (<button className={styles.buy} onClick={() => cart.addToCart(cereal)}>Add to Cart</button>)
                        :
                        (<button onClick={() => cart.removeFromCart(cereal)}>Remove from Cart</button>)
                }
                <button className={styles.infoButton} onClick={toggleInfo}>
                    {showMoreInfo ? "Show less" : "Show more"}
                </button>
                {showMoreInfo && (
                    <div className={styles.info}>
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
        </>
    );
};


export default CerealDisplay;