import { useState } from "react";

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
        <h3>{job.titulo}</h3>
        <small>
          {job.empresa} | {job.ubicacion}
        </small>
        <p>{job.descripcion}</p>
      </div>
      <button className={buttonClasses} onClick={handleApplyClick} disabled={isApplied}>
        {buttonText}
      </button>
    </article>
  );
}
