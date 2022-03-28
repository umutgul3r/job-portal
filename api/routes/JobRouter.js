const router = require("express").Router();

const {
  getAllJobs,
  createJobs,
  updateJobDetails,
  deleteJobController,
  getJobDetails,
  updateApplication,
  applyProductController,
  acceptedJob,
  deleteApplicationController,
} = require("../controllers/JobController");

router.post("/jobs", getAllJobs);
router.post("/create-jobs", createJobs);
router.post("/job-apply/:id", applyProductController);
router.post("/job-status/:id", acceptedJob);
router.get("/job/detail/:id", getJobDetails);
router.delete("/job/application/:id", deleteApplicationController);
router.put("/job/:id", updateJobDetails);
router.delete("/job/:id", deleteJobController);

module.exports = router;
