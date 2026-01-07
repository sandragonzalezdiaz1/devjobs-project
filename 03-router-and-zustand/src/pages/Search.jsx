import { Pagination } from "../components/Pagination.jsx";
import { SearchFormSection } from "../components/SearchFormSection.jsx";
import { JobListings } from "../components/JobListings.jsx";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";

// Constante que almacena el numero de trabajos por pagina
const RESULTS_PER_PAGE = 4

// CUSTOM HOOK
const useFilters = () => {
  // Variables de estado
  const [searchParams, setSearchParams] = useSearchParams()

  const [filters, setFilters] = useState(() => { // Para que los filtros se conserven al recargar la pagina
    return {
      technology: searchParams.get('technology') || '',
      location: searchParams.get('type') || '',
      experienceLevel: searchParams.get('level') || '',
    }
  })

  // Lazy initialization
  // React llama a esta función solo una vez, cuando se crea el estado inicial
  const [textToFilter, setTextToFilter] = useState(() => searchParams.get('text') || '') 

  const [currentPage, setCurrentPage] = useState(()=> {
    const page = Number(searchParams.get('page'))  // La URL tiene formato texto, convertimos a número
    return Number.isNaN(page) ? page : 1 
  }) 
  

  const [jobs, setJobs] = useState([]) // Estado para los empleos (inicialmente vacío) 
  const [total, setTotal] = useState(0)  // Estado para el total de resultados
  const [loading, setLoading] = useState(true) // Estado para indicar que estamos cargando

 
  //Llamada a la API externa dentro del useEffect
  useEffect(() => {
    // Función asíncrona dentro del efecto
    async function fetchJobs(){ 
      try {
        setLoading(true)  // Indicamos que estamos cargando

        const params = new URLSearchParams()

        if(textToFilter) params.append('text', textToFilter)
        if(filters.technology) params.append('technology', filters.technology)
        if(filters.location) params.append('type', filters.location)
        if(filters.experienceLevel) params.append('level', filters.experienceLevel)

        const offset = (currentPage - 1) * RESULTS_PER_PAGE
        searchParams.append('limit', RESULTS_PER_PAGE)
        searchParams.append('offset', offset)

        const queryParams = searchParams.toString() // Convertimos los parametros en una string

        // Delay artificial de 5s
        // await new Promise((resolve) => setTimeout(resolve, 5000)) // Quitar delay antes de subir a produccion

        // Hacemos la peticion fetch
        const response = await fetch(`https://jscamp-api.vercel.app/api/jobs?${queryParams}`)
        const json = await response.json() // Pasamos la respuesta a formato JSON
        // Guardamos los datos
        setJobs(json.data) // Solo el array de empleos
        setTotal(json.total) // Nº total de resultados

      } catch (error){
        console.error("Error al cargar los empleos", error)
      } finally {
        // Indicamos que terminamos de cargar
        setLoading(false) 
      }
    }

    fetchJobs() // Llamamos a la función

  }, [filters, textToFilter, currentPage]) // Se renderiza solo cuando se monta el componente


  useEffect(() => {
      setSearchParams(() => {
      // Limpia todos los parametros existentes en la url
      const params = new URLSearchParams()

      // Añade solo los parametros necesarios (usamos set() en vez de append())
      if(textToFilter) params.set('text', textToFilter)
      if(filters.technology) params.set('technology', filters.technology)
      if(filters.location) params.set('type', filters.location)
      if(filters.experienceLevel) params.set('level', filters.experienceLevel)

      // La página 1 se considera el valor por defecto
      if(currentPage > 1) searchParams.set('page', currentPage)
    
      return params
      })

    }, [filters, textToFilter, currentPage, setSearchParams])


  const totalPages = Math.ceil(total / RESULTS_PER_PAGE)

  const handlePageChange = (page) => {
    //console.log("Estas cambiando a la página: ", page)
    setCurrentPage(page) //Actualiza la pagina actual
    window.scrollTo({ top: 0, behavior: 'smooth' }) // Scroll al inicio al cambiar de pagina
  }

  const handleSearch = (filters) => {
    setCurrentPage(1)
    setFilters(filters)
  }

  const handleTextFilter = (newTextToFilter) => {
    setTextToFilter(newTextToFilter)
    setCurrentPage(1) //Resetea la pagina actual a la numero 1
  }

  return {
    loading,
    jobs,
    total,
    totalPages,
    currentPage,
    textToFilter,
    handlePageChange,
    handleSearch,
    handleTextFilter
  }

}

export default function SearchPage() {
  //console.log("App renderizado")

  const {
    loading,
    jobs,
    total,
    totalPages,
    currentPage,
    textToFilter,
    handlePageChange,
    handleSearch,
    handleTextFilter
  } = useFilters()

  // Cambia el titulo de la pagina
 /*  useEffect(() => {
    document.title = `Resultados: ${total}, Página ${currentPage} - DevJobs`
  },[total, currentPage]) */

  // El titulo depende del estado de la aplicacion
  const title =  loading ? `Cargando... - DevJobs` : `Resultados: ${total}, Página ${currentPage} - DevJobs`

  return (
    <>
      <main>
        <title>{title}</title>  { /* Etiqueta de SEO */ }
        <SearchFormSection 
          initialText={textToFilter}
          onSearch={handleSearch} 
          onTextFilter={handleTextFilter}
        />
        <section>
           <h2>Resultados de búsqueda</h2>
           { 
              loading ? <p>Cargando empleos...</p> : <JobListings jobs={jobs} />         
           }
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </section>
      </main>
    </>
  );
}


