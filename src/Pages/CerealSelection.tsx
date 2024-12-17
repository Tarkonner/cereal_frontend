import CerealDisplay from "../Components/CerealDisplay.tsx";
import {useEffect, useState} from "react";
import {Cereal} from "../Interfaces/Cereal.ts";
import {fetchAllPackageInfo} from "../API_Calles.ts";

const CerealSelection = () =>
{
    const [allPackageInfo, setAllPackageInfo] = useState<Cereal[]>([])

    async function GetAllPackageInfo() {
        setAllPackageInfo(await fetchAllPackageInfo());
    }

    useEffect(() => {
        GetAllPackageInfo()
    }, [])


    return (
        <>
            <div className="cereal-display">
                {allPackageInfo.map((cereal) => (
                    <CerealDisplay key={cereal.id} cereal={cereal}/>
                ))}
            </div>
        </>
    )
}
export default CerealSelection;