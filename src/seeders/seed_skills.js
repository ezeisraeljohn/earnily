const mongoose = require("mongoose");
const Skill = require("../models/skill_model");
const Category = require("../models/categories_model");
const connectDB = require("../config/db");
const skills = require("../modules/constants/skills_constants");

const seedSkills = async () => {
  try {
    await connectDB();
    await Skill.deleteMany();
    console.log("Skills cleared...");

    const categories = await Category.find();

    const skillData = skills.map((skill) => {
      const categoryIds = skill.category.map((catName) => {
        const category = categories.find((c) => c.name === catName);
        return category
          ? category._id
          : categories.find((c) => c.name === "Others")._id; // Fallback to 'Others'
      });

      return { ...skill, category: categoryIds };
    });

    await Skill.insertMany(skillData);
    console.log("Skills seeded successfully!");

    await mongoose.disconnect();
    console.log("Database connection closed.");

    // Exit successfully
    process.exit(0);
  } catch (error) {
    console.error("Error seeding skills: ", error);

    // Close connection on error
    await mongoose.disconnect();
    console.log("Database connection closed due to an error.");

    // Exit with failure
    process.exit(1);
  }
};

// Run the seeder
seedSkills();
