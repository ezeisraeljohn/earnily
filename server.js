const connectDB = require("./utils/db");
const express = require("express");
const authRouter = require("./routes/auth_routes");
const jobsRouter = require("./routes/job_routes");

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", authRouter);
app.use("/api/v1", jobsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
