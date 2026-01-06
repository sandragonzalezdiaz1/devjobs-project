import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "./Detail.module.css";
import { Link } from "../components/Link";
import snarkdown from "snarkdown";


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

export function JobDetail() {
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
        if (!response.ok) throw new Error("Job Not Found")
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
  }, [jobId])

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
      <div className={styles.container}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link href="/search" className={styles.breadcrumbButton}>
            Empleos
          </Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>{job.titulo}</span>
        </nav>
      </div>

      {/* Header principal */}
      <header className={styles.header}>
        <h1 className={styles.title}>{job.titulo}</h1>
        <p className={styles.meta}>
          {job.empresa} · {job.ubicacion}
        </p>
        <button className={styles.applyButton}>Aplicar ahora</button>
      </header>

      {/* Secciones de contenido */}
      <JobSection title="Descripción del puesto" content={job.content.description} />
      <JobSection title="Responsabilidades" content={job.content.responsibilities} />
      <JobSection title="Requisitos" content={job.content.requirements} />
      <JobSection title="Acerca de la empresa" content={job.content.about} />

    </div>
  )
}
