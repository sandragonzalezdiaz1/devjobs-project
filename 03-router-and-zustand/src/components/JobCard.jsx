import { useState } from "react";
import { Link } from "./Link";
import styles from "./JobCard.module.css";

export function JobCard({ job }) {
  //Variable de estado
  const [isApplied, setIsApplied] = useState(false);

  const handleApplyClick = () => {
    setIsApplied(!isApplied);
  };

  const buttonClasses = isApplied
    ? "button-apply-job is-applied"
    : "button-apply-job";
  const buttonText = isApplied ? "Aplicado" : "Aplicar";

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
      <button className={buttonClasses} onClick={handleApplyClick} disabled={isApplied}>
        {buttonText}
      </button>
    </article>
  );
}
