import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {fetchAllCereals, fetchAllPackageInfo} from "./API_Calles.ts"
import {Cereal} from "./Interfaces/Cereal.ts";
import CerealDisplay from "./Components/CerealDisplay.tsx";

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
          <div>
              <a href="https://vite.dev" target="_blank">
                  <img src={viteLogo} className="logo" alt="Vite logo"/>
              </a>
              <a href="https://react.dev" target="_blank">
                  <img src={reactLogo} className="logo react" alt="React logo"/>
              </a>
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
