const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();

const checkFileTypeApplication = (file, cb) => {
  const filetypes = /docx|docs|pdf/; //Accept only pdfs and docs
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (extname) {
    return cb(null, true);
  } else {
    cb(new Error("Error: Only pdfs and docs are allowed"));
  }
};

const uploadDocs = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    checkFileTypeApplication(file, cb);
  },
  limits: { fileSize: 1024 * 1024 * 5 }, //5MB
});

module.exports = { uploadDocs };
