const express = require("express");
const router = express.Router();
const Package = require("../models/Package");
app.use(express.json());

router.get("/", async (req, res) => {
  const packages = await Package.find();
  res.json(packages);
});

module.exports = router;
