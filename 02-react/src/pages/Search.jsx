import { Pagination } from "../components/Pagination.jsx";
import { SearchFormSection } from "../components/SearchFormSection.jsx";
import { JobListings } from "../components/JobListings.jsx";
import { useState } from "react";
import jobsData from "../data.json"

// Constante que almacena el numero de trabajos por pagina
const RESULTS_PER_PAGE = 4

export function SearchPage() {
  
  //console.log("App renderizado")

  // Variables de estado
  const [filters, setFilters] = useState({
     technology: '',
     location: '',
     experienceLevel: '',
     contractType: ''
  })
  const [currentPage, setCurrentPage] = useState(1) // Inicia siempre la pagina actual en la numero 1
  const [textToFilter, setTextToFilter] = useState('')

  // FILTRAR POR SELECTS
  const jobsFilteredByFilters = jobsData.filter(job => {
    return (
      /* Si coincide con el filtro (si filtrar) O si esta vacio (no filtrar) */
      (job.data.technology === filters.technology || filters.technology === '')
        && (job.data.modalidad === filters.location || filters.location === '' )
      && (job.data.nivel === filters.experienceLevel || filters.experienceLevel === '')
      && (job.data.contractType === filters.contractType || filters.contractType === '')
    ) 
  })

  // FILTRAR POR TEXTO
  /* Si textToFilter esta vacio -> no filtrar, devolver todos
  Si textToFilter tiene texto -> filtrar por titulo */
  const jobsWithTextFilter = textToFilter === '' ?
    jobsFilteredByFilters : jobsFilteredByFilters.filter(job => {
      return job.titulo.toLowerCase().includes(textToFilter.toLowerCase())
  })

  // PAGINACIÓN
  // Hay que calcular el nº total de paginas despues de filtrar los trabajos
   const totalPages = Math.ceil(jobsWithTextFilter.length / RESULTS_PER_PAGE) // 15/4 = 4 paginas en total
  // Math.ceil(): siempre redondea hacia arriba. Si usaramos math.floor() perderiamos la ultima pag parcial 

  //const pagedResults = jobsData.slice(0,5) // Muestra los 5 primeros trabajos
  const pagedResults = jobsWithTextFilter.slice(
    (currentPage - 1) * RESULTS_PER_PAGE, // inicio (Restamos 1 porque la pagina 1 empieza en indice 0)
    currentPage * RESULTS_PER_PAGE  // fin (no incluido)
  ) //Retorna un nuevo array con los elementos entre inicio y fin
  

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

  
  return (
    <>
      <main>
        <SearchFormSection onSearch={handleSearch} onTextFilter={handleTextFilter}/>
        <section>
          <JobListings jobs={pagedResults}/>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </section>
      </main>
    </>
  );
}


