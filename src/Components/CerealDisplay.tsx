import React, { useState, useEffect } from 'react';
import { Cereal } from "../Interfaces/Cereal";
import styles from "./CerealDisplay.module.css"
import {fetchImage} from "../API_Calles.ts";

interface CerealProps {
    cereal: Cereal;
}

const CerealDisplay: React.FC<CerealProps> = ({ cereal }: CerealProps) => {
    const [imageData, setImageData] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

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

            </div>
        </>
    );
};

export default CerealDisplay;