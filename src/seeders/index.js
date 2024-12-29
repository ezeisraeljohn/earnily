const { exec } = require("child_process");

// Run Categories Seeder
exec("node src/seeders/seed_categories.js", (err, stdout, stderr) => {
  if (err) {
    console.error(`Error seeding categories: ${err.message}`);
    return;
  }
  console.log(stdout);

  // After Categories, Seed Skills
  exec("node src/seeders/seed_skills.js", (err, stdout, stderr) => {
    if (err) {
      console.error(`Error seeding skills: ${err.message}`);
      return;
    }
    console.log(stdout);
  });
});
