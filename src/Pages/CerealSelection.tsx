import CerealDisplay from "../Components/CerealDisplay.tsx";
import {useEffect, useState} from "react";
import {Cereal} from "../Interfaces/Cereal.ts";
import {fetchAllCereals} from "../API_Calles.ts";

const CerealSelection = () =>
{
    const [allPackageInfo, setAllPackageInfo] = useState<Cereal[]>([])

    async function GetAllPackageInfo() {
        setAllPackageInfo(await fetchAllCereals());
    }

    useEffect(() => {
        GetAllPackageInfo()
    }, [])


    return (
        <>
            <div className="cereal-display">
                {allPackageInfo.map((cereal) => (
                    <CerealDisplay key={cereal.id} cereal={cereal} isAddButton={true}/>
                ))}
            </div>
        </>
    )
}
export default CerealSelection;