const Email = require("email-templates");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: true,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
  debug: true,
  logger: true,
});

transporter.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take messages");
  }
});

const NodeMailer = new Email({
  views: {
    options: {
      extension: 'ejs',
    },
  },
  htmlToText: false,
  preview: false,
  send: true,
  transport: transporter,
});

module.exports = NodeMailer;
