const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  getOffers,
  getSingleOffer,
  createOffer,
  updateOffer,
  deleteOffer,
} = require("../controllers/OfferController.js");

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});
const upload = multer({ storage: storage });

// Routes
router.get("/", getOffers);
router.post("/", upload.single("image"), createOffer);
router.get("/:id", getSingleOffer);
router.put("/:id", upload.single("image"), updateOffer); // ✅ FIXED
router.delete("/:id", deleteOffer);

module.exports = router;
