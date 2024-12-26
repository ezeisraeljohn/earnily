const jwt = require("jsonwebtoken");
const UAParser = require("ua-parser-js");
const bcrypt = require("bcryptjs");
const { BlobServiceClient } = require("@azure/storage-blob");
const { v4: uuidv4 } = require("uuid");

const AZURE_STORAGE_CONNECTION_STRING =
  process.env.AZURE_STORAGE_CONNECTION_STRING;

const blobServiceClient = BlobServiceClient.fromConnectionString(
  AZURE_STORAGE_CONNECTION_STRING
);

const uploadFileToAzure = async (file, containerName) => {
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const exists = await containerClient.exists();
  if (!exists) {
    await containerClient.create();
  }
  const blobName = `${uuidv4()}-${file.originalname}`;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  await blockBlobClient.uploadData(file.buffer, {
    blobHTTPHeaders: { blobContentType: file.mimetype },
  });
  return blockBlobClient.url;
};
const generateOtp = (num) => {
  if (process.env.NODE_ENV === "development") {
    return 100000;
  } else {
    return Math.floor(
      Math.random() * (9 * Math.pow(10, num - 1)) + Math.pow(10, num - 1)
    );
  }
};

const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "2d" });
  return token;
};

const generateSalt = (value) => {
  return bcrypt.genSaltSync(value);
};

const getIPAddress = (req) => {
  return (req.headers["x-forwarded-for"] || req.connection.remoteAddress).split(
    ","
  )[0];
};

const getLocation = async (ipAddress) => {
  const response = await fetch(
    `${process.env.IPINFO_URL}/${ipAddress}?token=${process.env.IPINFO_TOKEN}`
  );
  const location = await response.json();
  return location;
};

const getDevice = (device) => {
  const parser = new UAParser();
  parser.setUA(device);
  return parser.getResult();
};

const getDeviceAndLocation = async (req) => {
  const device = req.headers["user-agent"];
  const newDevice = getDevice(device);
  const ipAddress = getIPAddress(req);
  const location = await getLocation(ipAddress);

  return {
    device: `${newDevice.device?.vendor || "Unknown"} ${
      newDevice.device?.model || "Unknown"
    }`,
    os: newDevice.os?.name || "Unknown",
    browser: newDevice.browser?.name || "Unknown",
    location: {
      city: location.city,
      region: location.region,
      country: location.country,
    },
  };
};
module.exports = {
  generateOtp,
  generateToken,
  generateSalt,
  getIPAddress,
  getDeviceAndLocation,
  uploadFileToAzure,
};
