import {useEffect} from 'react'
import './App.css'
import NaveBar from "./Components/NaveBar.tsx";
import CerealSelection from "./Pages/CerealSelection.tsx";
import CheckoutPage from "./Pages/CheckoutPage.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";


function App() {


    useEffect(() => {
    }, [])


  return (
      <>
          <NaveBar/>
          <BrowserRouter>
              <Routes>
                  <Route index element ={<CerealSelection/>}/>
                  <Route path="/home" element={<CerealSelection/>}/>
                  <Route path="/checkout" element={<CheckoutPage/>}/>
              </Routes>
          </BrowserRouter>
      </>
  )
}

export default App
