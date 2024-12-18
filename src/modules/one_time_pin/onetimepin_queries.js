const OTP = require("../../models/onetimepin");
const bcrypt = require("bcryptjs");

const createOTPQuery = async (data) => {
  try {
    const new_otp = new OTP({ ...data });
    await new_otp.save();
    return new_otp.toObject();
  } catch (err) {
    console.error(err);
  }
};
const findOTPQuery = async (data) => {
  try {
    const otp = await OTP.findOne({ userId: data.userId });
    console.log(otp);
    return otp;
  } catch (err) {
    console.error(err);
  }
};

module.exports = { createOTPQuery, findOTPQuery };
