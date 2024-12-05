const { default: mongoose } = require("mongoose");
const { sendSuccess, sendFailure } = require("../utils/responses");

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
    const {
      title,
      description,
      location,
      jobType,
      salaryMin,
      salaryMax,
      company,
    } = req.body;
    const job = new Job({
      title,
      description,
      location,
      salaryMin,
      salaryMax,
      company,
      jobType,
      postedBy: req.user.id,
    });
    await job.save();
    const { __v: none, ...jobWithoutV } = job.toObject();
    jobWithoutV.id = jobWithoutV._id;
    delete jobWithoutV._id;
    sendSuccess(res, 201, "Job created successfully", jobWithoutV);
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
    if (!job) sendFailure(res, 404, "Job not found");
    if (job.postedBy.toString() !== req.user.id) {
      sendFailure(res, 401, "You are not authorized to update this job");
    }
    job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    const { __v: none, ...jobWithoutV } = job.toObject();
    jobWithoutV.id = jobWithoutV._id;
    delete jobWithoutV._id;
    sendSuccess(res, 200, "Job updated successfully", jobWithoutV);
  } catch (error) {
    console.error(error.message);
    sendFailure(res, 500, "An Error Occured");
  }
};

/**
 * @desc Delete a Job
 * @access Private
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @route DELETE /api/v1/jobs/:id
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
    sendSuccess(res, 200, "Job deleted successfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }
};

const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user.id });
    res.status(200).json({ success: true, status: 200, data: jobs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

const getJobs = async (req, res) => {
  try {
    const {
      location,
      title,
      jobType,
      salaryMin,
      salaryMax,
      company,
      page,
      limit,
    } = req.query;
    const query = {};
    if (location) {
      query.location = { $regex: location, $options: "i" }; // i for case insensitive
    }
    if (title) {
      query.title = { $regex: title, $options: "i" };
    }
    if (jobType) {
      query.jobType = jobType;
    }
    if (salaryMin && salaryMax) {
      query.salary = { $gte: salaryMin, $lte: salaryMax };
    }
    if (company) {
      query.company = { $regex: company, $options: "i" };
    }
    const currentPage = parseInt(page, 10) || 1;
    const itemsPerPage = parseInt(limit, 10) || 10;
    const skip = (currentPage - 1) * itemsPerPage;
    const jobs = await Job.find(query)
      .sort("-datePosted")
      .skip(skip)
      .limit(itemsPerPage);
    const totalJobs = await Job.countDocuments(query);
    const totalPages = Math.ceil(totalJobs / itemsPerPage);
    res.status(200).json({
      success: true,
      status: 200,
      pagination: {
        page: currentPage,
        totalPages,
        count: jobs.length,
        total: totalJobs,
      },
      data: jobs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

const getJob = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        status: 404,
        message: "Job not found",
      });
    }
    const job = await Job.findById(req.params.id);
    if (!job) sendFailure(res, 404, "Job not found");
    if (job.postedBy.toString() !== req.user.id) {
      sendFailure(res, 401, "You are not authorized to view this job");
    }
    const new_job = job.toObject();
    new_job.id = new_job._id;
    delete new_job._id;
    delete new_job.__v;
    sendSuccess(res, 200, "Job retrieved successfully", new_job);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  createJob,
  updateJob,
  deleteJob,
  getJob,
  getJobs,
  getMyJobs,
};
