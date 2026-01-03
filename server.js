// index.js
const express = require("express");
const pool = require("./db");
const cors = require("cors");
const offerRoutes = require("./backend/routes/offerRoutes");
const teamRoutes = require("./backend/routes/teamRoutes");
const popularDestinationRoutes = require("./backend/routes/popularDestinationRoutes");
const faqRoutes = require("./backend/routes/faqRoutes");
const reviewRoutes = require("./backend/routes/reviewRoutes");
const authRoutes = require("./backend/routes/AuthRoutes");
const userRoutes = require("./backend/routes/UserRoutes");

const app = express();
app.use(express.json());
app.use(cors());
// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Route to test Neon DB connection
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ success: true, time: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});
app.use("/api/offers", offerRoutes);
app.use(express.urlencoded({ extended: true })); // ✅ required for form-data (MULTER)
app.use("/api/popular-destinations", popularDestinationRoutes);
app.use("/uploads", express.static("uploads")); // to serve images
app.use("/api/team", teamRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
