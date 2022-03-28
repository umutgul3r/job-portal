const Jobs = require("../models/JobModel");

const getFilteredJobs = (where, sort, category) => {
  return Jobs.find({
    $and: [{ category: {$regex : category} }, { title: { $regex: where } }],
  }).sort(sort);
};

const detailJobs = (where) => {
  return Jobs.findById(where);
};

const createJob = async (where, data) => {
  const job = await Jobs.findOne({ job_id: where });
  if (job) {
    console.log("bu ilan mevcut");
  } else {
    const newJob = new Jobs(data);
    return newJob.save();
  }
};
const applyJob = async (jobm, jobId) => {
  return await Jobs.findOneAndUpdate(
    { _id: jobId },
    {
      $push: {
        applications: jobm,
      },
    }
  );
};
const acceptJob = async (jobm, jobId) => {
  return await Jobs.findOneAndUpdate(
    { _id: jobId },
    {
      $push: {
        accepted: jobm,
      },
    }
  );
};

const deleteApplication = (id) => {
  return Jobs.findOneAndUpdate(
    {
      "applications.id": id,
    },

    { $pull: { applications: { id: `${id}` } } }
  );
};

const updateJob = (data, id) => {
  const {
    title,
    description,
    category,
    maxApplicants,
    application,
    skillsets,
    salary,
  } = data;
  return Jobs.findOneAndUpdate(
    { _id: id },
    {
      title,
      description,
      category,
      maxApplicants,
      application,
      skillsets,
      salary,
    }
  );
};

const deleteJob = (where) => {
  return Jobs.findByIdAndDelete(where);
};

module.exports = {
  getFilteredJobs,
  createJob,
  applyJob,
  acceptJob,
  detailJobs,
  deleteApplication,
  updateJob,
  deleteJob,
};
