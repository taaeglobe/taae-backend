// models/Offer.js

const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    image: String,
    validUntil: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Offer", offerSchema);
