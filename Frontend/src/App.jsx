import { Link } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import useFetch from "./useFetch";
import Spinner from "./components/Spinner";
import { useState } from "react";

const App = () => {
  const { data, loading } = useFetch(
    "https://jobify-backend-blush.vercel.app/v1/jobs" || []
  );

  const [searchJob, setSearchJob] = useState("");
  const [jobs, setJobs] = useState([]);

  const [danger, setDanger] = useState(false);

  const searchMatches = data?.filter(
    (job) =>
      job.jobTitle.toLowerCase().includes(searchJob.toLowerCase()) ||
      job.jobTitle.toUpperCase().includes(searchJob.toUpperCase())
  );

  // Delete Job
  const deleteJob = async (jobId) => {
    try {
      const response = await fetch(
        `https://jobify-backend-blush.vercel.app/v1/jobs/${jobId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete job");
      }
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      window.location.reload();
    } catch (error) {
      throw error;
    }
  };

  return (
    <div>
      <Sidebar />
      {!loading ? (
        <div className="container-fluid my-4 ms-4 me-4">
          <input
            placeholder="Search by job title..."
            className="form-control search-bar"
            onChange={(e) => setSearchJob(e.target.value)}
          />
          <h3 className="my-4">All Jobs</h3>
          {danger && (
            <p
              className="bg-danger py-2 ps-2 pe-2 rounded text-white"
              style={{ width: "22rem" }}
            >
              Job deleted successfully!
            </p>
          )}
          <div className="row me-4">
            {searchMatches?.map((job) => (
              <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={job._id}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{job?.jobTitle}</h5>
                    <p>
                      <strong>Company name: </strong>
                      {job?.companyName}
                    </p>
                    <p>
                      <strong>Location: </strong>
                      {job?.location}
                    </p>
                    <p>
                      <strong>Job Type: </strong>
                      {job?.jobType}
                    </p>
                    <div className="d-flex gap-2 link-btn">
                      <Link
                        className="btn btn-primary button"
                        to={`/job/job-details/${job._id}`}
                      >
                        See Details
                      </Link>
                      <button
                        className="btn btn-danger button"
                        onClick={() => {
                          deleteJob(job._id);
                          setDanger(true);
                          setTimeout(() => {
                            setDanger(false);
                          }, 1000);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};
export default App;
