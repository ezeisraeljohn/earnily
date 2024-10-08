const connectDB = require("./utils/db");
const express = require("express");
const authRouter = require("./routes/auth_routes");

const app = express();

connectDB();

app.use("/api/v1", authRouter);
