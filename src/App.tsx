import {useEffect, useState} from 'react'
import './App.css'

import {fetchAllCereals, fetchAllPackageInfo} from "./API_Calles.ts"
import {Cereal} from "./Interfaces/Cereal.ts";
import CerealDisplay from "./Components/CerealDisplay.tsx";
import NaveBar from "./Components/NaveBar.tsx";

function App() {
    const [cereals, setCereals] = useState<Cereal[]>([])
    const [allPackageInfo, setAllPackageInfo] = useState<Cereal[]>([])

    async function getCereals() {
        setCereals(await fetchAllCereals());
    }
    async function GetAllPackageInfo() {
        setAllPackageInfo(await fetchAllPackageInfo());
    }


    useEffect(() => {
        getCereals()
        GetAllPackageInfo()
    }, [])


  return (
      <>
          <NaveBar></NaveBar>
          <div className="cereal-display">
              {allPackageInfo.map((cereal) => (
                  <CerealDisplay key={cereal.id} cereal={cereal}/>
              ))}
          </div>
          <div className="cereal-grid">
              {
                  cereals.map((cereal) => (
                      <p key={cereal.id} className="cereal-grid">
                          {cereal.id} : {cereal.name}
                      </p>
                  ))
              }
          </div>
      </>
  )
}

export default App
