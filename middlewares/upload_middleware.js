const multer = require("multer");
const path = require("path");

/**
 * @description This function is used to upload files to the server
 * @param {Object} req - The request object
 * @param {Object} file - The file object
 * @param {Function} cb - The callback function
 * @returns {void}
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/resumes");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const checkFileType = (file, cb) => {
  const filetypes = /docx|docs|pdf/; //Accept only pdfs and docs
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (extname) {
    return cb(null, true);
  } else {
    cb(new Error("Error: Only pdfs and docs are allowed"));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
  limits: { fileSize: 1024 * 1024 * 5 }, //5MB
});

module.exports = upload;
