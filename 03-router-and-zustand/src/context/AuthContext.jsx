import { createContext, useState } from 'react';

export const AuthContext = createContext() // Crea el contexto que va a contener el estado global

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

    //Ya no hace falta hacer AuthContext.Provider
    return <AuthContext value={value}>{children}</AuthContext>

}