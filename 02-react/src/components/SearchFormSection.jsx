import { useId, useState } from "react"; // Hook que genera id unicos para evitar colisiones de nombres (Ideal para formularios)

// CUSTOM HOOK
const useSearchForm = ({ onSearch, onTextFilter, idTechnology, idLocation, idExperienceLevel, idContractType }) => {

  //Variables de estado
  const [searchText, setSearchText] = useState("") // Guarda el texto introducido por el usuario
  // Cuando enviamos el formulario
  const handleSubmit = (event) => {
    event.preventDefault()

    // Solo obtiene los datos del input/select que cambió
    //const formData = new FormData(event.target)

    // Obtiene todos los datos del formulario
    const formData = new FormData(event.currentTarget);

    // Almacena los valores de los select de cada uno de los filtros en un objeto
    const filters = {
      technology: formData.get(idTechnology),
      location: formData.get(idLocation),
      experienceLevel: formData.get(idExperienceLevel),
      contractType: formData.get(idContractType),
    }

    //console.log(filters)
    onSearch(filters)
  }

  // Búsqueda de texto en tiempo real
  const handleChangeText = (event) => {
    const text = event.target.value; //Recupera el valor del input
    setSearchText(text) // Actualiza en el estado el texto
    onTextFilter(text)
  }
  // Devuelve lo que el componente necesita
  return {
    searchText,
    handleSubmit,
    handleChangeText
  }

}

export function SearchFormSection({ onSearch, onTextFilter }) {
  const idText = useId()
  const idTechnology = useId()
  const idLocation = useId()
  const idExperienceLevel = useId()
  const idContractType = useId()

  const { handleSubmit, handleChangeText} = useSearchForm({ idTechnology, idLocation, idExperienceLevel, idContractType, onSearch, onTextFilter})
  
  // Estado para saber qué campo está activo
  const [focusedField, setFocusedField] = useState(null);

  return (
    <section className="jobs-search">
      <h1>Encuentra tu próximo trabajo</h1>
      <p>Explora miles de oportunidades en el sector tecnológico.</p>

      <form id="empleos-search-form" role="search" onChange={handleSubmit}>
        <div className="search-bar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-search"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
          </svg>

          <input
            name={idText}
            id="empleos-search-input"
            type="text"
            placeholder="Buscar trabajos, empresas o habilidades"
            onChange={handleChangeText}
            onFocus={() => setFocusedField("search")}
            onBlur={() => setFocusedField(null)}
            style={{
              borderColor: focusedField === "search" ? "#4f46e5" : "#d1d5db",
              outline: focusedField === "search" ? "2px solid #4f46e5" : "none",
            }}
          />
        </div>

        <div className="search-filters">
          <select name={idTechnology} id="filter-technology">
            <option value="">Tecnología</option>
            <optgroup label="Tecnologías populares">
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="react">React</option>
              <option value="nodejs">Node.js</option>
            </optgroup>
            <option value="java">Java</option>
            <hr />
            <option value="csharp">C#</option>
            <option value="c">C</option>
            <option value="c++">C++</option>
            <hr />
            <option value="ruby">Ruby</option>
            <option value="php">PHP</option>
          </select>

          <select name={idLocation} id="filter-location">
            <option value="">Ubicación</option>
            <option value="remoto">Remoto</option>
            <option value="cdmx">Ciudad de México</option>
            <option value="guadalajara">Guadalajara</option>
            <option value="monterrey">Monterrey</option>
            <option value="barcelona">Barcelona</option>
          </select>

          <select name={idExperienceLevel} id="filter-experience-level">
            <option value="">Nivel de experiencia</option>
            <option value="junior">Junior</option>
            <option value="mid-level">Mid-level</option>
            <option value="senior">Senior</option>
            <option value="lead">Lead</option>
          </select>

          <select name={idContractType} id="filter-contract-type">
            <option value="">Tipo de contrato</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="freelance">Freelance</option>
            <option value="internship">Prácticas</option>
          </select>
        </div>
      </form>

      <span id="filter-selected-value"></span>
    </section>
  );
}
