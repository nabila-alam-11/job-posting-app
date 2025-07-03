import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import useFetch from "../useFetch";
import Spinner from "../components/Spinner";
import Error from "../components/Error";

const JobDetails = () => {
  const { jobId } = useParams();
  const { data, loading, error } = useFetch(
    "https://jobify-backend-blush.vercel.app/v1/jobs"
  );
  const jobDetails = data?.find((job) => job._id === jobId);
  return (
    <div>
      <Sidebar />
      {error ? (
        <Error />
      ) : (
        <>
          {!loading ? (
            <div className="container-fluid my-4 ms-4 me-4">
              <h1 className="mb-3">{jobDetails?.jobTitle}</h1>

              <div className="border border-2 border-light-subtle me-5 rounded-2 ps-3 pe-3 py-2">
                <p>
                  <strong>Company Name: </strong>
                  {jobDetails?.companyName}
                </p>
                <p>
                  <strong>Location: </strong>
                  {jobDetails?.location}
                </p>
                <p>
                  <strong>Salary: </strong>
                  {jobDetails?.salary}
                </p>
                <p>
                  <strong>Job Type: </strong>
                  {jobDetails?.jobType}
                </p>
                <p>
                  <strong>Description: </strong>
                  {jobDetails?.description}
                </p>
                <div>
                  <strong>Qualifications: </strong>
                  <ol>
                    {jobDetails?.qualifications?.map((qfc, index) => (
                      <li key={index}>{qfc}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          ) : (
            <Spinner />
          )}
        </>
      )}
    </div>
  );
};
export default JobDetails;
