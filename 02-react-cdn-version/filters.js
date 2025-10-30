const filter = document.querySelector('#filter-location')
const mensaje = document.querySelector('#filter-selected-value')

filter.addEventListener('change', function () {

  const jobs = document.querySelectorAll('.job-listing-card') //Selecciona todos los trabajos una vez estan cargados en la pagina
  const selectedValue = filter.value 

  if(selectedValue){
    mensaje.textContent = `Has seleccionado ${selectedValue}`
  } else {
    mensaje.textContent = ''
  }

  jobs.forEach(job => {
    //const modalidad = job.dataset.modalidad
    const modalidad = job.getAttribute('data-modalidad')

    //Cuando tenemos que mostrar el articulo
    const isShown = selectedValue === '' || selectedValue === modalidad

    job.classList.toggle('is-hidden', !isShown) //Si isShown es false, añade la clase is-hidden, si es true, la quita (Con esto nos quitamos el if/else)


    /* if(selectedValue === '' || selectedValue === modalidad){
      //job.style.display = 'flex' //valor original
      job.classList.remove('is-hidden') //En lugar de modificar el estilo, se añade o quita una clase

    } else {
      //job.style.display = 'none'
      job.classList.add('is-hidden')
    } */

  })

})


const filterExperience = document.querySelector("#filter-experience-level")

filterExperience.addEventListener("change", function(){

 const jobs = document.querySelectorAll('.job-listing-card') //Selecciona todos los trabajos una vez estan cargados en la pagina
 const selectedValue = filterExperience.value 

//Recorremos los trabajos para mostrar solo los que coincidan
jobs.forEach(job => {

  const nivel = job.getAttribute("data-nivel")

  const isShown = selectedValue === '' || selectedValue === nivel

  job.classList.toggle('is-hidden', !isShown)
  
})


})

const filterTechnology = document.querySelector("#filter-technology")

filterTechnology.addEventListener("change",function(){

 const jobs = document.querySelectorAll('.job-listing-card')
 const selectedValue = filterTechnology.value

 jobs.forEach(job => {

  const isShown = job.getAttribute("data-technology").includes(selectedValue)
  job.classList.toggle("is-hidden", !isShown)

 })


})