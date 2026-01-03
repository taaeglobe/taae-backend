const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String }, // image filename
});

module.exports = mongoose.model("Team", teamSchema);
