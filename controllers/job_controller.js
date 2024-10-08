const Job = require("../models/index").Job;
const Application = require("../models/index").Application;

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

module.exports = { createJob };
