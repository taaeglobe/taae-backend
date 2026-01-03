const pool = require("../../db");

// GET all reviews
exports.getReviews = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM reviews ORDER BY id DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};

// CREATE a review
exports.createReview = async (req, res) => {
  try {
    const { username, description, stars } = req.body;
    const newReview = await pool.query(
      "INSERT INTO reviews (username, description, stars) VALUES ($1, $2, $3) RETURNING *",
      [username, description, stars]
    );
    res.status(201).json(newReview.rows[0]);
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ error: "Failed to create review" });
  }
};

// DELETE a review
exports.deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM reviews WHERE id = $1", [id]);
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete review" });
  }
};
