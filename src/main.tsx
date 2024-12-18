import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ShoppingCartContextProvider from "./ShoppingCartContextProvider.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ShoppingCartContextProvider>
        <App />
    </ShoppingCartContextProvider>
  </StrictMode>,
)
