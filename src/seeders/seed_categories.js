const mongoose = require("mongoose");
const Category = require("../models/categories_model");
const categories = require("../modules/constants/categories_constants");
const connectDB = require("../config/db");

const seedCategories = async () => {
  try {
    // Connect to the database
    await connectDB();

    // Clear existing categories
    await Category.deleteMany();
    console.log("Categories cleared...");

    await Category.insertMany(categories);
    console.log("Categories seeded successfully!");

    await mongoose.disconnect();
    console.log("Database connection closed.");

    process.exit(0);
  } catch (err) {
    console.error(err.message);

    // Close database connection on error
    await mongoose.disconnect();
    console.log("Database connection closed due to an error.");

    process.exit(1);
  }
};

seedCategories();
