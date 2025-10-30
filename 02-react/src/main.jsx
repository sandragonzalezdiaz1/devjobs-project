import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  //StrictMode se utiliza en desarrollo (en produccion NO)
  //<StrictMode>
    <App />
 // </StrictMode>,
)
