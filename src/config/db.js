const moongose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    let MONGO_URI;
    if (process.env.NODE_ENV === "test") {
      MONGO_URI = process.env.T_MONGO_URL;
    } else {
      MONGO_URI = process.env.TEST_MONGO_URL || process.env.MONGO_URL;
    }
    const conn = await moongose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 60000,
    });
    if (process.env.NODE_ENV !== "test") {
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
