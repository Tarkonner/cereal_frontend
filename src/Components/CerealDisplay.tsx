import React from 'react';
import { Cereal } from "../Interfaces/Cereal";
import styles from "./CerealDisplay.module.css"
import viteLogo from '/vite.svg'

interface CerealProps {
    cereal: Cereal;
}



const CerealDisplay: React.FC<CerealProps> = ({ cereal }: CerealProps) => {
    return (
        <>

            <div className={styles.cerealDisplay}>
                <div className={styles.imageColumn}>
                    <img src={viteLogo} alt="Vite logo"/>
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