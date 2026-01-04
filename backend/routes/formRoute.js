const express = require("express");
const router = express.Router();
const {
  getForms,
  createForm,
} = require("../controllers/formController");

router.get("/", getForms);
router.post("/", createForm);

module.exports = router;
