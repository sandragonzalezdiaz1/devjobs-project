import { create } from 'zustand'

// Este store se encarga de gestionar los trabajos favoritos del usuario
export const useFavoritesStore = create((set, get) => ({
    // Estado
    favorites: [],
    // Acciones
    addFavorite: (jobId) => {
        set((state) => ({
            // Hay que comprobar si el jobId ya está en favoritos para no añadirlo dos veces
            favorites: state.favorites.includes(jobId) ? state.favorites : [...state.favorites, jobId]
        }))
    },

    removeFavorite: (jobId) => {
        set((state) => ({
            // Filtramos el jobId que queremos eliminar y devolvemos un nuevo array sin ese jobId
            favorites: state.favorites.filter((id) => id !== jobId)
        }))
    },

    isFavorite: (jobId) =>  {
        return get().favorites.includes(jobId) // get() nos devuelve el estado actual,
        //  y accedemos a favorites para comprobar si incluye el jobId
    },

    // Acción combinada para alternar el estado de favorito
    toggleFavorite: (jobId) => {
        const { addFavorite, removeFavorite, isFavorite } = get() // Obtenemos el estado actual y las acciones del store
        const isFav = isFavorite(jobId) // Comprobamos si el jobId ya es favorito
        isFav ? removeFavorite(jobId) : addFavorite(jobId) // Si es favorito lo eliminamos, si no lo añadimos
    },

    // Estado derivado para contar el numero de trabajos favoritos
    countFavorites: () => get().favorites.length


}))