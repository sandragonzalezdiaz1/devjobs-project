import { useContext } from 'react';
import { createContext, useState } from 'react';

const AuthContext = createContext() // Crea el contexto que va a contener el estado global

//Proveedor
// Envuelve la app y provee los valores globales
export function AuthProvider ({ children }){
    
    const [isLoggedIn, setIsLoggedIn ] = useState(false)

    const login = () => {
        setIsLoggedIn(true)
    }

    const logout = () => {
        setIsLoggedIn(false)
    }

    const value = {
        isLoggedIn,
        login,
        logout
    }

    return <AuthContext value={value}>{children}</AuthContext>

}

// Custom Hook
export function useAuth(){
    //Leemos el contexto y lo devolvemos
    const context = useContext(AuthContext)
    // Comprobamos que tenemos el provider <AuthProvider> envolviendo <App/> en main.jsx
    if(context === undefined){
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}