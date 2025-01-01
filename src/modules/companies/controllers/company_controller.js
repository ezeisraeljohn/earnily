const mongoose = require("mongoose");
const User = require("../../../models/user_model");
const Company = require("../../../models/company_model");
const { uploadFileToAzure } = require("../../../shared/utils/helpers");
const { sendFailure, sendSuccess } = require("../../../shared/utils/responses");

const createCompany = async (req, res) => {
  try {
    const { name, description, location, website } = req.body;
    const user = await User.findById(req.user.id);
    console.log(req.user.id);
    console.log(req.body);
    if (!user) {
      return sendFailure(res, 404, "User not found");
    }
    const logoUrl = await uploadFileToAzure(req.files.logo[0], "logos");
    if (user.company)
      return sendFailure(res, 400, "User already has a company");
    const company = await Company.create({
      name,
      description,
      location,
      website,
      logo: logoUrl,
      createdBy: req.user.id,
    });
    user.company = company._id;
    await user.save();
    const { __v, _id, ...companyObject } = company.toObject();
    companyObject.id = _id;
    sendSuccess(res, 201, "Company created successfully", companyObject);
  } catch (error) {
    console.error(error);
    sendFailure(res, 500, "Oops an Error Occured");
  }
};

const getCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    const user = await User.findById(req.user.id);
    const company = await Company.findById(companyId);
    if (!user) return sendFailure(res, 404, "User not found");
    if (!company) return sendFailure(res, 404, "Company not found");
    if (company.createdBy.toString() !== req.user.id)
      return sendFailure(res, 401, "Unauthorized Access");
    const companyObject = company.toObject();
    return sendSuccess(
      res,
      200,
      "Company retrieved successfully",
      companyObject
    );
  } catch (error) {
    console.error(error);
    sendFailure(res, 500, "Oops an Error Occured");
  }
};

const updateCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    const { description, website } = req.body;
    const company = await Company.findById(companyId);
    if (company.createdBy.toString() !== req.user.id)
      return sendFailure(res, 401, "Unauthorized access");
    const updatedCompany = await Company.findByIdAndUpdate(
      companyId,
      {
        description,
        website,
      },
      { new: true, validateBeforeSave: true }
    );
    const companyObject = updatedCompany.toObject();
    return sendSuccess(res, 200, "Company updated successfully", companyObject);
  } catch (error) {
    console.error(error);
    sendFailure(res, 200, "Oops an Error Occured");
  }
};

const deleteCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    const company = await Company.findById(companyId);
    if (!company) return sendFailure(res, 404, "Company not found");
    if (company.createdBy.toString() !== req.user.id)
      return sendFailure(res, 401, "Unauthorized access");
    await Company.findByIdAndDelete(companyId);
    return sendSuccess(res, 200, "Company deleted successfully");
  } catch (error) {
    console.error(error);
    sendFailure(res, 500, "Oops an Error Occured");
  }
};

module.exports = { createCompany, getCompany, updateCompany, deleteCompany };
