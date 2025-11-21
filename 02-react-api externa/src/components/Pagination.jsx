import styles from "./Pagination.module.css" // importamos el CSS Module

// Valores por defecto en los parametros
export function Pagination({ currentPage = 1, totalPages = 10, onPageChange = () => {} }) {

    //console.log('render Pagination')

  // Genera un array de paginas a mostrar
  // { length: totalPages } define la longitud del array
  // (_, i) => i + 1 transforma cada índice en un número de página
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1); // Si en total son 10 paginas generaría [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  //Se utiliza _ como parametro para que no tenga en cuenta ese parametro, no interesa darle un valor

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const stylePrevButton = isFirstPage
    ? { pointerEvents: "none", opacity: 0.5 }
    : {};

  const styleNextButton = isLastPage
    ? { pointerEvents: "none", opacity: 0.5 }
    : {};

  const handlePrevClick = (event) => {
    event.preventDefault();
    if (!isFirstPage) { //Si no estamos en la primera pagina
      onPageChange(currentPage - 1); // Llama a la funcion del padre para cambiar a la pagina anterior
    }
  };

  const handleNextClick = (event) => {
    event.preventDefault();
    if (!isLastPage) { //Si no estamos en la ultima pagina
      onPageChange(currentPage + 1); // Cambia a la pagina siguiente
    }
  };

  const handleChangePage = (event) => {
    event.preventDefault(); //Evita el evento por defecto (la navegacion)

    // Recupera la pagina por el atributo data del <a>
    const page = Number(event.target.dataset.page)

    if (page !== currentPage) {
      //Si la pagina es diferente a la pagina actual
      onPageChange(page); //Cambia a esa pagina
    }
  };

  return (
    <nav className={styles.pagination}>
      {/* Si no es la primera pagina entonces muestra el svg flecha <  (es lo mismo que poner isFirstPage === false)*/}
      {!isFirstPage && (
        <a href="#" style={stylePrevButton} onClick={handlePrevClick}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M15 6l-6 6l6 6" />
          </svg>
        </a>
      )}

      {/* Recorre el array y crea un <a> por cada pagina */}
      {pages.map((page) => (
        <a 
        key={page}
         data-page={page}
         href="#" 
         className={currentPage === page ? styles.isActive : ""}
         onClick={handleChangePage} 
        >
          {page}
        </a>
      ))}

      {/* Si no es la ultima pagina muestra el svg */}
      {!isLastPage && (
        <a href="#" style={styleNextButton} onClick={handleNextClick}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 6l6 6l-6 6" />
          </svg>
        </a>
      )}
    </nav>
  );
}
