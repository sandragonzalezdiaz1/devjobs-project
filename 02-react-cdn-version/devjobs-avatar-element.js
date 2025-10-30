/* Creamos una clase que hereda propiedades y metodos de HTMLElement */
class DevJobsAvatar extends HTMLElement {
  constructor() {
    super(); //Llamar al constructor de HTMLElement
    this.attachShadow({ mode: "open" }); //Creamos un arbol DOM encapsulado para que nuestro componente no se vea afectado por los estilos de la pagina (Por ejemplo estilos para todas las <img>)
    /* Con Shadow DOM:
    -Los estilos dentro del componente no afectan al resto de la página
    -Los estilos de la página no afectan al componente
    -Cada instancia del componente tiene su propio árbol DOM encapsulado
    Esto es perfecto para crear componentes verdaderamente reutilizables y aislados. */
  
  }

  createUrl(service, username){
    return `https://unavatar.io/${service}/${username}`
  }

  render() {
    //Operador de fusión nula ?? para establecer valores x defecto
    const service = this.getAttribute('service') ?? 'github'
    const username = this.getAttribute('username') ?? 'midudev'
    const size = this.getAttribute('size') ?? '40'

    const url = this.createUrl(service, username)

    // Ahora usamos shadowRoot en lugar de innerHTML
    // this.innerHTML =
    this.shadowRoot.innerHTML = `
        <style>
        img {
            width: ${size}px;
            height: ${size}px;
            border-radius: 9999px;
        }

        </style>
        <img 
            src=${url}
            alt="Avatar de ${username}"
            class="avatar" 
            />        
        `;
  }

  /* connectedCallback(): se ejecuta automáticamente cuando el elemento se añade al DOM. Es el momento perfecto para renderizar el contenido inicial. */
  connectedCallback() {
    this.render();
  }
}

//Registramos nuestro componente para que el navegador lo reconozca
customElements.define("devjobs-avatar", DevJobsAvatar);
/*
    Primer argumento: El nombre de la etiqueta HTML (debe tener al menos un guion)
    Segundo argumento: La clase del componente
*/
