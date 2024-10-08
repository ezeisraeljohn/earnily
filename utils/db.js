const moongose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await moongose.connect("mongodb://localhost:27017/jobsearch");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
