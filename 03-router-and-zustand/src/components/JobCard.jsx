import { useState } from "react"
import { Link } from "./Link"
import styles from "./JobCard.module.css"
import { useFavoritesStore } from "../store/favoritesStore"
import { useAuthStore } from "../store/authStore"


// Componente para el botón de favorito dentro de la tarjeta de trabajo
function JobCardFavoriteButton({ jobId }){
  //Realmente estamos extrayendo toda la store
  const { toggleFavorite, isFavorite } = useFavoritesStore()
  const { isLoggedIn } = useAuthStore()

  return (
    <button disabled={!isLoggedIn} onClick={() => toggleFavorite(jobId)}>
        {isFavorite(jobId) ? "♥️" : "🤍"}
      </button>
  )
}

function JobCardApplyButton({ jobId }){

  const [isApplied, setIsApplied] = useState(false)
  const { isLoggedIn } = useAuthStore()


  const handleApplyClick = () => {
    console.log('Aplicando el trabajo de id:', jobId)
    setIsApplied(!isApplied)
  }

  const buttonClasses = isApplied ? "button-apply-job is-applied" : "button-apply-job"

  const buttonText = isApplied ? "Aplicado" : "Aplicar"

  return (
     <button className={buttonClasses} onClick={handleApplyClick} disabled={!isLoggedIn}>
        {buttonText}
      </button>
  )
}

export function JobCard({ job }) {
  return (
    <article
      className="job-listing-card"
      data-modalidad={job.data.modalidad}
      data-nivel={job.data.nivel}
      data-technology={job.data.technology}
    >
      <div>
        <h3>
          <Link href={`/jobs/${job.id}`} className={styles.title} aria-label={`Ver detalles de ${job.titulo} en ${job.empresa}`}>
            {job.titulo}
          </Link>
        </h3>
        <small>
          {job.empresa} | {job.ubicacion}
        </small>
        <p>{job.descripcion}</p>
      </div>
      <div className={styles.actions}>
        <Link href={`/jobs/${job.id}`} className={styles.details}>
          Ver detalles
        </Link>
      </div>
      <JobCardApplyButton jobId={job.id} />
      <JobCardFavoriteButton jobId={job.id} />
    </article>
  )
}
