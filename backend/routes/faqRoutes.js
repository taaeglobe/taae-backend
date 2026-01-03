const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer(); // memory storage

const faqController = require("../controllers/FaqController");

router.get("/", faqController.getAllFaqs);
router.post("/", upload.none(), faqController.createFaq);
router.put("/:id", upload.none(), faqController.updateFaq);
router.delete("/:id", faqController.deleteFaq);

module.exports = router;
