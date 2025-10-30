// Almacenamos el contenedor <div> de las ofertas de trabajo 
const jobsListingSection = document.querySelector('.jobs-listings')

//DELEGACIÓN DE EVENTOS 
//Si se hace click en el contenedor
/* optional chaining (?.) :  es un operador que verifica automáticamente si algo existe antes de acceder a sus propiedades o métodos. */
jobsListingSection?.addEventListener('click', function(event) {
  // Averiguamos qué elemento ha sido el que ha recibido el click
  const element = event.target
  console.log(element)

  // Si el elemento tiene la clase button-apply-job
  if (element.classList.contains('button-apply-job')) {
    element.textContent = '¡Aplicado!'
    element.classList.add('is-applied')
    element.disabled = true
  }
})

/* Comentarios con otros eventos interesantes */

//Otras formas de añadir eventos click a elementos
// recupera solo el primer boton que encuentre
// const boton = document.querySelector('.button-apply-job')
// console.log(boton) // null si no lo encuentra

// if (boton !== null) {
//   boton.addEventListener('click', function() {
//     boton.textContent = '¡Aplicado!'
//     boton.classList.add('is-applied') // añade la clase is-applied
//     boton.disabled = true // desactiva el boton
//   }) 
// }


// const botones = document.querySelectorAll('.button-apply-job')
// // devuelve un NodeList (array-like) con todos los botones que encuentre
// // o una lista vacia [] si no encuentra ninguno

// Siempre se puede recorrer con forEach, porque si es un nodelist vacio no hace nada
// botones.forEach(boton => {
    //Para cada boton, añade un event listener
//   boton.addEventListener('click', function() {
//     boton.textContent = '¡Aplicado!'
//     boton.classList.add('is-applied')
//     boton.disabled = true
//   })
// })

// EJEMPLOS DE EVENTOS 
// const searchInput = document.querySelector('#empleos-search-input')

// searchInput.addEventListener('input', function() {
//   console.log(searchInput.value)
// })

// searchInput.addEventListener('blur', function() {
//  console.log('Se dispara cuando el campo pierde el foco')
//  })

//  const searchForm = document.querySelector('#empleos-search-form')

//  searchForm.addEventListener('submit', function(event) {
//   event.preventDefault() //Evita que se recargue la pagina 
// //   // ... todo lo que yo te diga aqui
//   console.log('submit')
//  })

//  document.addEventListener('keydown', function(event) {
//    console.log("Tecla presionada: ", event.key)
//   console.log("¿Está pulsada la tecla shift?", event.shiftKey)
//   console.log("¿Está pulsada la tecla ctrl?", event.ctrlKey)
//   console.log("¿Está pulsada la tecla alt?", event.altKey)
//  })