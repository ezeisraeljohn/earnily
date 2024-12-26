const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();
const checkFileTypeCompany = (file, cb) => {
  const filetypes = /png|jpeg|jpg/;
  const extname = filetypes.test(
    path.extname(file.originalname).toLocaleLowerCase()
  );
  if (extname) {
    cb(null, true);
  } else {
    cb(new Error("Error: Only pdfs and docs are allowed"));
  }
};

const uploadLogo = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    checkFileTypeCompany(file, cb);
  },
  limits: { fileSize: 1024 * 1024 * 5 },
});

module.exports = { uploadLogo };
