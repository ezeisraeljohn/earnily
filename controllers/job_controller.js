const Job = require("../models/index").Job;

/**
 * @desc Create a new job
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @route POST /api/v1/jobs
 * @access Private
 * @returns {Promise<void>}
 */
const createJob = async (req, res) => {
  try {
    const { title, description, location, jobType, salary, company } = req.body;
    const job = new Job({
      title,
      description,
      location,
      salary,
      company,
      jobType,
      postedBy: req.user.id,
    });
    await job.save();
    const { __v: none, ...jobWithoutV } = job.toObject();
    jobWithoutV.id = jobWithoutV._id;
    delete jobWithoutV._id;
    res.status(201).json({
      success: true,
      status: 201,
      message: "Job created successfully",
      data: jobWithoutV,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }
};

/**
 * @desc Update a Job
 *@param {Object} req - Request object
 *@param {Object} res - Response object
 *@route PUT /api/v1/jobs/:id
 *@access Private
 *@returns {Promise<void>}
 */
const updateJob = async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Job not found",
      });
    }
    if (job.postedBy.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        status: 401,
        message: "You are not authorized to update this job",
      });
    }
    job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    const { __v: none, ...jobWithoutV } = job.toObject();
    jobWithoutV.id = jobWithoutV._id;
    delete jobWithoutV._id;
    res.status(200).json({
      success: true,
      status: 200,
      message: "Job updated successfully",
      data: jobWithoutV,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }
};

/**
 * @desc Delete a Job
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @route DELETE /api/v1/jobs/:id
 * @access Private
 * @returns {Promise<void>}
 */
const deleteJob = async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Job not found",
      });
    }
    if (job.postedBy.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        status: 401,
        message: "You are not authorized to delete this job",
      });
    }
    await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      status: 200,
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }
};

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user.id });
    res.status(200).json({ success: true, status: 200, data: jobs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

const getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (job.postedBy.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        status: 401,
        message: "You are not authorized to view this job",
      });
    }
    const new_job = job.toObject();
    new_job.id = new_job._id;
    delete new_job._id;
    delete new_job.__v;
    res.status(200).json({ success: true, status: 200, data: new_job });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

module.exports = { createJob, updateJob, deleteJob, getJobs, getJob };
