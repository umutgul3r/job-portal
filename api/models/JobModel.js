const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    job_id: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    employer_id: {
      type: String,
      trim: true,
      required: true,
    },
    employerName: {
      type: String,
      trim: true,
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    application: {
      type: Number,
      default: 0,
    },
    applications: [],
    accepted: [],
    skillsets: [String],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    salary: Number,
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Jobs", jobSchema);
