const pool = require("../../db");

const getAllFaqs = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM faqs ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



const createFaq = async (req, res) => {
  const { question, answer } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO faqs (question, answer) VALUES ($1, $2) RETURNING *",
      [question, answer]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateFaq = async (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  try {
    const result = await pool.query(
      "UPDATE faqs SET question=$1, answer=$2 WHERE id=$3 RETURNING *",
      [question, answer, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteFaq = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM faqs WHERE id=$1", [id]);
    res.json({ message: "Destination deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllFaqs, createFaq, updateFaq, deleteFaq };
