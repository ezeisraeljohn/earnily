const mongoose = require("mongoose");

const suggestSkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    length: 50,
  },
  category: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: true,
    },
  ],
});

const SuggestSkill = mongoose.model("SuggestSkill", suggestSkillSchema);

module.exports = SuggestSkill;
