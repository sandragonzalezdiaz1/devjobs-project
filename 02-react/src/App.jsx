import { Header } from "./components/Header.jsx" //No hace falta poner la extension .jsx porque estamos usando el empaquetador Vite pero es recomendable hacerlo
import { Footer } from "./components/Footer.jsx";
import { Pagination } from "./components/Pagination.jsx";
import { SearchFormSection } from "./components/SearchFormSection.jsx";
import { JobListings } from "./components/JobListings.jsx";
import { useState } from "react";
import jobsData from "./data.json"

// Constante que almacena el numero de trabajos por pagina
const RESULTS_PER_PAGE = 4

function App() {
  //console.log('render App')

  //Variable de estado
  const [filters, setFilters] = useState({
     technology: '',
     location: '',
     experienceLevel: ''
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [textToFilter, setTextToFilter] = useState('')


  const jobsFilteredByFilters = jobsData.filter(job => {
    return (
      (job.data.technology === filters.technology || filters.technology === '')
    )
  })

  const jobsWithTextFilter = textToFilter === '' ?
    jobsFilteredByFilters : jobsFilteredByFilters.filter(job => {
      return job.titulo.toLowerCase().includes(textToFilter.toLowerCase())
  })

  // Tenemos que calcular el nº total de paginas despues de filtrar los trabajos
   const totalPages = Math.ceil(jobsWithTextFilter.length / RESULTS_PER_PAGE) // 15/4 = 4 paginas en total

  //const pagedResults = jobsData.slice(0,5) //Muestra los 5 primeros trabajos
  const pagedResults = jobsWithTextFilter.slice(
    (currentPage - 1) * RESULTS_PER_PAGE, // Página 1 -> 0x4=0, Página 2 -> 1*4= 4, Página 3-> 2*4=8 ...
    currentPage * RESULTS_PER_PAGE // Página 1-> 4, Página 2 -> 8, Página 3 -> 12 (el job 12 no se incluye, seria hasta el 11), ...
  )

  const handlePageChange = (page) => {
    //console.log("Estas cambiando a la página: ", page)
    setCurrentPage(page) //Actualizamos la pagina actual
  }

  const handleSearch = (filters) => {
    setCurrentPage(1)
    setFilters(filters)
  }

  const handleTextFilter = (newTextToFilter) => {
    setTextToFilter(newTextToFilter)
    setCurrentPage(1) //Reseteamos la pagina actual a la numero 1
  }

  return (
    <>
      <Header />
      <main>
        <SearchFormSection onSearch={handleSearch} onTextFilter={handleTextFilter}/>
        <section>
          <JobListings jobs={pagedResults}/>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
