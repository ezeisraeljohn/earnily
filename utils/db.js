const moongose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.TEST_MONGO_URL || process.env.MONGO_URI;
    const conn = await moongose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 60000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
