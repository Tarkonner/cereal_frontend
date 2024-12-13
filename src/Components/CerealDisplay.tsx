import React from 'react';
import { Cereal } from "../Interfaces/Cereal";

interface CerealProps {
    cereal: Cereal;
}

const CerealDisplay: React.FC<CerealProps> = ({ cereal }: CerealProps) => {
    return (
        <div>
            <p>{cereal.name}</p>
            <p>{cereal.manufacturer}</p>
            <p>{cereal.type}</p>
            <p>{cereal.rating}</p>
        </div>
    );
};

export default CerealDisplay;