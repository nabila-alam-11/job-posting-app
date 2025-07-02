const mongoose = require("mongoose");
const { type } = require("os");

const jobSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
      enum: [
        "Full-time(On-site)",
        "Part-time(On-site)",

        "Full-time(Remote)",
        "Part-time(Remote)",
        "Full-time(Hybrid)",
        "Part-time(Hybrid)",
        "Internship",
        "Freelance",
        "Apprenticeship",
        "Temporary",
        "Contract",
      ],
    },
    description: {
      type: String,
    },

    salary: {
      type: Number,
      required: true,
    },
    qualifications: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
