import { useState } from "react";
import Sidebar from "../components/Sidebar";
import useFetch from "../useFetch";

const PostJob = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    salary: 0,
    jobType: "",
    description: "",
    qualifications: [],
  });
  console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const addJob = async (newJob) => {
    try {
      const response = await fetch(
        "https://jobify-backend-blush.vercel.app/v1/jobs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newJob),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create job.");
      }
      const addedJob = await response.json();
      return addedJob;
    } catch (error) {
      throw error;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newJob = {
      jobTitle: formData.jobTitle,
      companyName: formData.companyName,
      location: formData.location,
      salary: formData.salary,
      jobType: formData.jobType,
      description: formData.description,
      qualifications: formData.qualifications,
    };

    try {
      await addJob(newJob);
      setFormData({
        jobTitle: "",
        companyName: "",
        location: "",
        salary: null,
        jobType: "",
        description: "",
        qualifications: [],
      });
    } catch (error) {
      console.log("Failed to add job: ", error.message);
    }
  };
  return (
    <div>
      <Sidebar />
      <div className="container-fluid my-4 ms-4 me-4">
        <h1 className="my-4">Post a Job</h1>
        <form className="me-5" onSubmit={handleSubmit}>
          <label className="mb-2" htmlFor="job-title">
            Job Title:
          </label>
          <input
            className="mb-4 form-control"
            type="text"
            id="job-title"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
          />
          <label className="mb-2" htmlFor="company-name">
            Company Name:
          </label>
          <input
            className="mb-4 form-control"
            type="text"
            id="company-name"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
          />
          <label className="mb-2" htmlFor="location">
            Location:
          </label>
          <input
            className="mb-4 form-control"
            type="text"
            id="location"
            name="location"
            onChange={handleChange}
            value={formData.location}
          />
          <label className="mb-2" htmlFor="salary">
            Salary:
          </label>
          <input
            className="mb-4 form-control"
            type="number"
            name="salary"
            id="salary"
            value={formData.salary}
            onChange={handleChange}
          />
          <label className="mb-2" htmlFor="job-type">
            Job Type:
          </label>
          <select
            id="job-type"
            className="mb-4 form-select"
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
          >
            <option value="">Select Job Type</option>
            <option value="Full-time(On-site)">Full-time(On-site)</option>
            <option value="Part-time(On-site)">Part-time(On-site)</option>
            <option value="Full-time(Remote)">Full-time(Remote)</option>
            <option value="Part-time(Remote)">Part-time(Remote)</option>
            <option value="Full-time(Hybrid)">Full-time(Hybrid)</option>
            <option value="Part-time(Hybrid)">Part-time(Hybrid)</option>
            <option value="Internship">Internship</option>
            <option value="Freelance">Freelance</option>
            <option value="Apprenticeship">Apprenticeship</option>
            <option value="Temporary">Temporary</option>
            <option value="Contract">Contract</option>
          </select>
          <label className=" mb-2" htmlFor="job-description">
            Job Description
          </label>
          <input
            className="mb-4 form-control"
            id="job-description"
            type="text"
            name="description"
            onChange={handleChange}
            value={formData.description}
          />
          <label className="mb-2" htmlFor="qualification">
            Job Qualifications:
          </label>
          <input
            name="qualifications"
            onChange={handleChange}
            value={formData.qualifications}
            className="mb-4 form-control"
            id="qualification"
            type="text"
          />
          <button type="submit" className="btn btn-primary">
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
};
export default PostJob;
