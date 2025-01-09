import CerealDisplay from "../Components/CerealDisplay.tsx";
import {useEffect, useState} from "react";
import {Cereal} from "../Interfaces/Cereal.ts";
import {fetchAllCereals} from "../API_Calles.ts";

const CerealSelection = () => {
    const [allPackageInfo, setAllPackageInfo] = useState<Cereal[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch all cereals when the component mounts
    async function GetAllPackageInfo() {
        setAllPackageInfo(await fetchAllCereals());
    }

    useEffect(() => {
        GetAllPackageInfo();
    }, []);

    // Filter the cereals based on the search query
    const filteredCereals = allPackageInfo.filter((cereal) =>
        cereal.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className="Searchbar">
                <h2>Search</h2>
                <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    type="search"
                    placeholder="Search cereals by name"
                />
            </div>
            <div className="cereal-display">
                {filteredCereals.map((cereal) => (
                    <CerealDisplay key={cereal.id} cereal={cereal} isAddButton={true} />
                ))}
            </div>
        </>
    );
};
export default CerealSelection;