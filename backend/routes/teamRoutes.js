const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const teamController = require("../controllers/TeamController");

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Routes
router.get("/", teamController.getTeam);
router.post("/", upload.single("image"), teamController.createTeamMember);
router.put("/:id", upload.single("image"), teamController.updateTeamMember);
router.delete("/:id", teamController.deleteTeamMember);

module.exports = router;
