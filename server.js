const connectDB = require("./utils/db");
const express = require("express");
const authRouter = require("./routes/auth_routes");
const jobsRouter = require("./routes/job_routes");
const applicationRouter = require("./routes/application_route");
const path = require("path");
const cors = require("cors");

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/v1/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/v1", applicationRouter);
app.use("/api/v1", authRouter);
app.use("/api/v1", jobsRouter);

const PORT = process.env.PORT || 8080;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
module.exports = app;
