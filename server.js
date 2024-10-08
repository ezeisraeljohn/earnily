const connectDB = require("./utils/db");
const express = require("express");

const app = express();
connectDB();
