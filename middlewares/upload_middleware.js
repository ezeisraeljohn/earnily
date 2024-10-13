const multer = require("multer");
const path = require("path");
const { BlobServiceClient } = require("@azure/storage-blob");
const { v4: uuidv4 } = require("uuid");

const AZURE_STORAGE_CONNECTION_STRING =
  process.env.AZURE_STORAGE_CONNECTION_STRING;

const blobServiceClient = BlobServiceClient.fromConnectionString(
  AZURE_STORAGE_CONNECTION_STRING
);

const containerName = "resumes";

const uploadFileToAzure = async (file) => {
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobName = `${uuidv4()}-${file.originalname}`;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  await blockBlobClient.uploadData(file.buffer, {
    blobHTTPHeaders: { blobContentType: file.mimetype },
  });
  return blockBlobClient.url;
};

const storage = multer.memoryStorage();

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

module.exports = { upload, uploadFileToAzure };
