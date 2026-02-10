import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "./Detail.module.css";
import { Link } from "../components/Link";
import snarkdown from "snarkdown";
//import { useContext } from "react"; // Context API
//import { AuthContext } from "../context/AuthContext";
//import { useAuth } from "../context/AuthContext"; // Custom hook para usar Context API
import { useAuthStore } from "../store/authStore";
import { useFavoritesStore } from "../store/favoritesStore";

// Componente reutilizable (las secciones tienen el mismo layout) 
function JobSection({ title, content }) {
  const html = snarkdown(content)

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {/* inyeccion de HTML */}
      <div className={`${styles.sectionContent} prose`} dangerouslySetInnerHTML={{
        __html: html
        }}>
      </div>
    </section>
  );
}

/* Breadcrumb: elemento de navegación en una página web que muestra la ruta jerárquica desde 
la página de inicio hasta la página actual, como Inicio > Categoría > Subcategoría > Página
 */ 
function DetailPageBreadCrumb({ job }){
  return (
    <div className={styles.container}>
        <nav className={styles.breadcrumb}>
          <Link href="/search" className={styles.breadcrumbButton}>
            Empleos
          </Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>{job.titulo}</span>
        </nav>
      </div>
  )
}


/* Header */
function DetailPageHeader({ job }){
  return (
    <>
      <header className={styles.header}>
        <div className={styles.head}>
          <h1 className={styles.title}>{job.titulo}</h1>
          <p className={styles.meta}>
              {job.empresa} · {job.ubicacion}
          </p>
        </div>
        <div>
          <DetailApplyButton />
          <DetailFavoriteButton jobId={job.id}/>
        </div>
         
      </header>
    </>
  )
}

function DetailApplyButton(){
  const {isLoggedIn} = useAuthStore()
  return (
     <button disabled={!isLoggedIn} className={styles.applyButton}>
          { isLoggedIn ? "Aplicar ahora" : "Inicia sesión para aplicar" }
     </button>
  )
}

function DetailFavoriteButton({ jobId }){
  const { isFavorite, toggleFavorite } = useFavoritesStore()
  return (
   <button className={styles.favoriteButton} onClick={() => toggleFavorite(jobId)}>
        {isFavorite(jobId) ? "♥️" : "🤍"}
    </button>
  )

}

export default function JobDetail() {
  const { jobId } = useParams() // El nombre del parametro tiene que coincidir con el que hemos puesto en el path de la ruta "/.../:id"
  // useParams() siempre devuelve strings

  const navigate = useNavigate() // Navegación programatica de React
  // Variables de estado 
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`https://jscamp-api.vercel.app/api/jobs/${jobId}`)
      .then((response) => {
        if (!response.ok){
          navigate('/not-found')
        }
        return response.json()
      })
      .then((json) => {
        setJob(json)
      })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [jobId, navigate])

  if (loading) {
    return (
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
        <div className={styles.loading}>
          <p className={styles.loadingText}>Cargando...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
        <div className={styles.error}>
          <h2 className={styles.errorTitle}>Oferta no encontrada</h2>
          <p>
            Puede que esta oferta haya caducado o que la URL no sea correcta.
          </p>
          <button onClick={() => navigate("/")}>
            Volver a la lista de empleos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
      {/* Breadcrumb */}
      <DetailPageBreadCrumb job={job}/>
      {/* Header */}
      <DetailPageHeader job={job} />
      {/* Secciones de contenido */}
      <JobSection title="Descripción del puesto" content={job.content.description} />
      <JobSection title="Responsabilidades" content={job.content.responsibilities} />
      <JobSection title="Requisitos" content={job.content.requirements} />
      <JobSection title="Acerca de la empresa" content={job.content.about} />
      <DetailApplyButton />
    </div>
  )
}
