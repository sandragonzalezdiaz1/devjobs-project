
const container = document.querySelector('.jobs-listings')

//Prueba de asincronía con fetch
//console.log("Antes del fetch")
//Peticion fetch para obtener los trabajos desde un archivo JSON
fetch("./data.json") /* fetch es asincrono */
  .then((response) => {
  return response.json();
})
  .then((jobs) => {
    //console.log("Tengo los resultados del fetch")
    console.log(jobs);
    jobs.forEach(job => {
      //Creamos un articulo por cada trabajo
      const article = document.createElement('article')
      //article.classList.add('job-listing-card')
      article.className = 'job-listing-card' //Otra forma de añadir una clase
     //article.setAttribute('data-modalidad', job.data.modalidad) 
     //Otra forma de añadir un atributo data-*
     article.dataset.modalidad = job.data.modalidad
    article.dataset.technology = job.data.technology
    article.dataset.nivel = job.data.nivel

    article.innerHTML = `
    <div>
    <h3>${job.titulo}</h3>
    <small>${job.empresa} | ${job.ubicacion}</small>
    <p>${job.descripcion}</p>
    </div>
    <button class="button-apply-job">Aplicar</button>`

    container.appendChild(article) //Añadimos el articulo al contenedor

    })

})

//console.log("Después del fetch")

