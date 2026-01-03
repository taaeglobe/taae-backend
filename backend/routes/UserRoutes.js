const express = require("express");
const router = express.Router();
const { getUsers, updateUserStatus } = require("../controllers/UserController");

// Get all users
router.get("/", getUsers);

// Update active/inactive status
router.put("/:id/status", updateUserStatus);

module.exports = router;
