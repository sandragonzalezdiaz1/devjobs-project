import { JobCard } from "./JobCard.jsx";
//import { Fragment } from "react";

export function JobListings({ jobs }) {
  return (
    // <Fragment></Fragment> es lo mismo que <></> pero hay que importarlo
    <>
      <h2>Resultados de búsqueda</h2>
      <div className="jobs-listings">
        {jobs.map(job => (
             <JobCard key={job.id} job={job} />
        ))}
      </div>
    </>
  );
}