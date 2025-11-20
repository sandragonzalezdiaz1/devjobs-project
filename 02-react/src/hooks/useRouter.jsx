import { useEffect, useState } from "react";

// CUSTOM HOOK
export function useRouter(){
  // Estado para la ruta actual
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  // Efecto para detectar cambios de navegación
  useEffect(() => {
    // Función que actualiza el estado con la nueva ruta
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }

    // Escuchar cambios en el historial (botón atrás/adelante)
    window.addEventListener('popstate',(handleLocationChange)) 

    // Limpiamos el event listener al desmontar
    return () => {
      window.removeEventListener('popstate', handleLocationChange) // Limpiamos la funcion
    }
   }, []) /* El listener se añade solo una vez cuando el componente se monta, no en cada render */

   // Funcion para navegar de forma programática
   function navigateTo(path){
    window.history.pushState({}, '', path) // Cambia la URL sin recargar la página
    window.dispatchEvent(new PopStateEvent('popstate')) // Emite un evento para notificar el cambio
   }

    // Retornar la API del hook
    return { currentPath, navigateTo }
}