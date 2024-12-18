const NodeMailer = require("./nodemailer_service");

const emailHeader = process.env.EMAIL_HEADER;

const verifyEmail = (emailData) => {
  NodeMailer.send({
    template: "verify_email",
    message: {
      from: `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_ADDRESS}>`,
      to: emailData.email,
      subject: `${emailHeader}: Email Verification`,
    },
    locals: {
      locale: "en",
      otp: emailData.otp
    },
  }).catch((err) => {
    console.error(err);
  });
  console.log("Email sent");
};

module.exports = verifyEmail;
