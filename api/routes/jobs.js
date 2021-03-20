var express = require("express");
var router = express.Router();
var jobController = require("../controllers/jobController");
var { upload } = require("../middlewares/imageUpload");
const { auth } = require("../middlewares/auth");


/* GET single job */
router.get("/:jobId",auth, jobController.getJob);


/* Get all jobs listings*/
router.get("/",auth, jobController.getAllJobs);

/* POST for job applications */
router.post("/application/:applicationId", auth, jobController.applicationMgmt);


/* Post a job */
router.post(
  "/createJob",
  auth,
  upload.array("images", 8),
  jobController.createJob
);

/*Apply for a job */
//
//
//
router.patch("/:jobId/apply", auth, jobController.applyJob);



module.exports = router;
