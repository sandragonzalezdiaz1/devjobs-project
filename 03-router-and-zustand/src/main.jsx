import { BrowserRouter } from 'react-router'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
//import { AuthProvider } from './context/AuthContext.jsx'   // Context API
//import { FavoritesProvider } from './context/FavContext.jsx' // Context API

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  {/* <AuthProvider><App /></AuthProvider> */}
    <App /> 
  </BrowserRouter>

)
