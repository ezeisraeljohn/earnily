const Application = require("../models/application_model");
const Job = require("../models/job_model");

const applyForJobs = async (req, res) => {
  const { coverLetter, resume, jobId } = req.body;
  try {
    const job = await Job.findById(jobId);
    if (!job)
      return res.status(400).json({
        success: false,
        status: 404,
        message: "Job not found",
      });

    // Check for existing application
    const existingApplication = await Application.findOne({
      applicant: req.user.id,
      job: jobId,
    });
    if (existingApplication)
      return res.status(400).json({
        success: false,
        status: 400,
        message: "You have already applied for this job",
      });

    // Resume file required
    if (!req.files || !req.files.resume) {
      return res.status(400).json({ msg: "Resume is required" });
    }
    const application = await Application.create({
      job: jobId,
      applicant: req.user.id,
      resume: `${req.baseUrl}/${req.files.resume[0].path}`,
      coverLetter,
    });
    res.status(201).json({
      success: true,
      status: 201,
      data: application,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};

//Get Different Applications for Jobs
const getApplicationsForJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job)
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Job not found",
      });
    if (job.postedBy.toString() !== req.user.id)
      return res.status(401).json({
        success: false,
        status: 401,
        message: "Unauthorized Access",
      });
    const applications = await Application.find({
      job: req.params.jobId,
    }).populate("applicant", "firstName lastName email");
    res.status(200).json({
      success: true,
      status: 200,
      data: applications,
    });
  } catch (error) {
    console.log(eror);
    res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};

//Get History of Applications

const getApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user.id,
    }).populate("job", "title company location salary jobType");
    res.status(200).json({
      success: true,
      status: 200,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};

// Update Application Status
const updateApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate(
      "applicant",
      "firstName lastName email"
    );
    if (!application)
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Application not found",
      });
    const job = await Job.findById(application.job._id);
    const postedBy = job.postedBy.toString();
    if (postedBy !== req.user.id)
      return res.status(401).json({
        success: false,
        status: 401,
        message: "Unauthorized Access",
      });
    application.status = req.body.status;
    await application.save();
    res.status(200).json({
      success: true,
      status: 200,
      data: application,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};
module.exports = {
  applyForJobs,
  getApplicationsForJob,
  getApplications,
  updateApplication,
};
