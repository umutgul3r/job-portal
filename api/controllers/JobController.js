const Jobs = require("../models/JobModel");
const {
  getFilteredJobs,
  createJob,
  applyJob,
  acceptJob,
  detailJobs,
  deleteApplication,
  updateJob,
  deleteJob,
} = require("../services/Job");

const getAllJobs = (req, res) => {
  getFilteredJobs(req.body.title, req.body.sort, req.body.category)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(404).send(error);
    });
};

const getJobDetails = async (req, res) => {
  detailJobs(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(404).send(error);
    });
};

const createJobs = async (req, res) => {
  createJob(req.body.job_id, req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).json({ msg: err.message });
    });
};

const applyProductController = async (req, res) => {
  const random = Math.floor(Math.random() * 46884711);
  const id = String(random);
  const jobm = { ...req.body, id };
  applyJob(jobm, req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).json({ msg: err.message });
    });
};

const acceptedJob = async (req, res) => {
  const random = Math.floor(Math.random() * 46884711);
  const id = String(random);
  const jobm = { ...req.body, id };
  acceptJob(jobm, req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).json({ msg: err.message });
    });
};

const deleteApplicationController = async (req, res) => {
  deleteApplication(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).json({ msg: err.message });
    });
};

const updateJobDetails = async (req, res) => {
  req.body.title = req.body.title.toLowerCase();
  updateJob(req.body, req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).json({ msg: err.message });
    });
};

const deleteJobController = async (req, res) => {
  deleteJob(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).json({ msg: err.message });
    });
};

module.exports = {
  getAllJobs,
  createJobs,
  updateJobDetails,
  deleteJobController,
  getJobDetails,
  applyProductController,
  acceptedJob,
  deleteApplicationController,
};
