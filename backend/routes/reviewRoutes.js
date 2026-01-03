const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewsController");
const multer = require("multer");
const upload = multer(); // memory storage
router.get("/", reviewController.getReviews);
router.post("/", upload.none(), reviewController.createReview);
router.delete("/:id", reviewController.deleteReview);

module.exports = router;
