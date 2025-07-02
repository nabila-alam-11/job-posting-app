const express = require("express");

const app = express();
const cors = require("cors");
const { initializeDatabase } = require("./db/db.connect");

app.use(express.json());

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

const Job = require("./models/job.model");
initializeDatabase();

app.get("/", (req, res) => {
  res.send("Welcome to Intern House");
});

// ******* CREATE JOB ********//
async function createJob(newJob) {
  try {
    const job = new Job(newJob);
    return await job.save();
  } catch (error) {
    throw error;
  }
}

app.post("/v1/jobs", async (req, res) => {
  try {
    const job = await createJob(req.body);
    res.status(201).json({ message: "Job added successfully.", Job: job });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add job." });
  }
});

// READ ALL JOBS
async function getJobs() {
  try {
    const jobs = await Job.find();
    return jobs;
  } catch (error) {
    throw error;
  }
}
app.get("/v1/jobs", async (req, res) => {
  try {
    const jobs = await getJobs();
    if (jobs.length != 0) {
      res.json(jobs);
    } else {
      res.status(404).json({ error: "Jobs not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jobs." });
  }
});

// UPDATE A JOB

async function updateJobById(jobId, dataToUpdated) {
  try {
    const updatedJob = await Job.findByIdAndUpdate(jobId, dataToUpdated, {
      new: true,
    });
    return updatedJob;
  } catch (error) {
    console.log("Error in updating job:", error.message);
  }
}

app.post("/v1/jobs/:jobId", async (req, res) => {
  try {
    const updatedJob = await updateJobById(req.params.jobId, req.body);
    if (updatedJob) {
      res
        .status(200)
        .json({ message: "Job updated successfully.", updatedJob });
    } else {
      res.status(404).status({ error: "Job not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update job." });
  }
});

// ******* DELETE A JOB ********//

async function deleteJobById(jobId) {
  try {
    const deletedJob = await Job.findByIdAndDelete(jobId);
    return deletedJob;
  } catch (error) {
    console.log("Error in deleting job: ", error.message);
  }
}

app.delete("/v1/jobs/:jobId", async (req, res) => {
  try {
    const deletedJob = await deleteJobById(req.params.jobId);
    if (deletedJob) {
      res
        .status(200)
        .json({ message: "Job deleted successfully.", deletedJob });
    } else {
      res.status(400).json({ error: "Job not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete job: ", error });
  }
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
