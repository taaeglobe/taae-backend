const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getDestinations,
  getSingleDestination,
  getInternationalDestinations,
  getDomesticDestinations,
  createDestination,
  updateDestination,
  deleteDestination,
} = require("../controllers/PopularDestinationController.js");

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // make sure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Routes
router.get("/", getDestinations);
router.get("/international", getInternationalDestinations);
router.get("/domestic", getDomesticDestinations);
router.get("/:id", getSingleDestination);
router.post("/", upload.single("image"), createDestination);
router.put("/:id", upload.single("image"), updateDestination);
router.delete("/:id", deleteDestination);

module.exports = router;
