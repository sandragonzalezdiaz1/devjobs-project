const container = document.querySelector(".jobs-listings");

const searchFilter = document.querySelector("#empleos-search-input");
const resultsInfo = document.querySelector("#results-info"); //Para mostrar en la pagina: “Mostrando 5 de 20 ofertas”

let allJobs = [];

//Prueba de asincronía con fetch
//console.log("Antes del fetch")
//Peticion fetch para obtener los trabajos desde un archivo JSON
fetch("./data.json") /* fetch es asincrono */
  .then((response) => {
    return response.json();
  })
  .then((jobs) => {
    //console.log("Tengo los resultados del fetch")
    allJobs = jobs;
    console.log(allJobs);
    renderJobs(allJobs); //Renderizamos todos los trabajos para que se muestren en la pagina
  });

function renderJobs(jobsToRender) {
  //Vaciamos el contenedor
  container.innerHTML = "";

  jobsToRender.forEach((job) => {
    //Creamos un articulo por cada trabajo
    const article = document.createElement("article");
    //article.classList.add('job-listing-card')
    article.className = "job-listing-card"; //Otra forma de añadir una clase
    //article.setAttribute('data-modalidad', job.data.modalidad)
    //Otra forma de añadir un atributo data-*
    article.dataset.modalidad = job.data.modalidad;
    article.dataset.technology = job.data.technology;
    article.dataset.nivel = job.data.nivel;

    article.innerHTML = `
    <div>
    <h3>${job.titulo}</h3>
    <small>${job.empresa} | ${job.ubicacion}</small>
    <p>${job.descripcion}</p>
    </div>
    <button class="button-apply-job">Aplicar</button>`;

    container.appendChild(article); //Añadimos el articulo al contenedor
  });

   resultsInfo.textContent = `Mostrando ${jobsToRender.length} de ${allJobs.length} ofertas`;

}

//Activamos el buscador una vez cargadas las ofertas
searchFilter.addEventListener("input", function () {
  const busqueda = searchFilter.value.toLowerCase();
  //console.log(busqueda)

  //Filtramos los que coincidan
  const filteredJobs = allJobs.filter((job) => {
    return job.titulo.toLowerCase().includes(busqueda);
  });

  console.log(filteredJobs);

  renderJobs(filteredJobs); //Re-renderizamos solo los trabajos que coincidan con el buscador
 
});

//console.log("Después del fetch")
