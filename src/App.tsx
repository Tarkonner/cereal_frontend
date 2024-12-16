import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {fetchAllCereals, fetchAllPackageInfo, fetchImage} from "./API_Calles.ts"
import {Cereal} from "./Interfaces/Cereal.ts";
import CerealDisplay from "./Components/CerealDisplay.tsx";

function App() {
    const [cereals, setCereals] = useState<Cereal[]>([])
    const [allPackageInfo, setAllPackageInfo] = useState<Cereal[]>([])
    const [cerealImage, setCerealImage] = useState()

    async function getCereals() {
        setCereals(await fetchAllCereals());
    }
    async function GetAllPackageInfo() {
        setAllPackageInfo(await fetchAllPackageInfo());
    }
    async function GetImage()
    {
        setCerealImage(await fetchImage(1));
    }


    useEffect(() => {
        getCereals()
        GetAllPackageInfo()
        GetImage()
    }, [])


  return (
      <>
          <div>
              <a>
                  <img src={viteLogo} className="logo" alt="Vite logo"/>
              </a>
              <a>
                  <img src={reactLogo} className="logo react" alt="React logo"/>
              </a>
          </div>
          <div>
              <img
              src={cerealImage}
              />
          </div>
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
