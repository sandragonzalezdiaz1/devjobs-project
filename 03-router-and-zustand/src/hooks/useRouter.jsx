import { useNavigate, useLocation } from "react-router";

// Custom Hook: aqui cambiamos las dependencias 
export function useRouter(){
 
  const navigate = useNavigate() // Para navegar de forma programática
  const location = useLocation() // Devuelve la localizacion actual de la URL (path, queryParams,etc)
  const currentPath = location.pathname
  
   function navigateTo(path){
    console.log("Navegando a:", path)
     navigate(path)
   }

    return { currentPath, navigateTo }
}