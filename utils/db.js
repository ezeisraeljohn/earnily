const moongose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    const MONGO_URI =
      process.env.MONGO_URL || "mongodb://localhost:27017/jobsearch";
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
