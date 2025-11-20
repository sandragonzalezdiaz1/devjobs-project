import { useRouter } from "../hooks/useRouter.jsx"

// Prop component con destructuring
export function Route({ path, component: Component }) {
  // Obtiene la ruta actual del router
  const { currentPath } = useRouter()

  // Si la ruta no coincide, no renderiza nada
  if (currentPath !== path) {
    return null
  }

  // Si coincide, renderiza el componente
  return <Component />
}