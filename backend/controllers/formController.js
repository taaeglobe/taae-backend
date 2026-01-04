const pool = require("../../db");

/* GET all forms */
exports.getForms = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM forms ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* POST form */
exports.createForm = async (req, res) => {
  try {
    const { name, email, phoneNumber, message } = req.body;

    if (!name || !email || !phoneNumber || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const result = await pool.query(
      `INSERT INTO forms (name, email, phone_number, message)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, email, phoneNumber, message]
    );

    res.status(201).json({
      success: true,
      data: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
