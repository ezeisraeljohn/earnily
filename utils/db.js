const moongose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await moongose.connect("mongodb://localhost:27017/jobsearch", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
