const pool = require("../../db");

exports.getOffers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM offers ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getSingleOffer = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM offers WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Offer not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.createOffer = async (req, res) => {
  const { place_name, slogan, description } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const result = await pool.query(
      "INSERT INTO offers (place_name, slogan, description, image) VALUES ($1, $2, $3, $4) RETURNING *",
      [place_name, slogan, description, image]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateOffer = async (req, res) => {
  const { id } = req.params;
  const { place_name, slogan, description } = req.body;

  try {
    let query = "";
    let values = [];

    if (req.file) {
      query =
        "UPDATE offers SET place_name = $1, slogan = $2, description = $3, image = $4 WHERE id = $5 RETURNING *";
      values = [place_name, slogan, description, req.file.filename, id];
    } else {
      query =
        "UPDATE offers SET place_name = $1, slogan = $2, description = $3 WHERE id = $4 RETURNING *";
      values = [place_name, slogan, description, id];
    }

    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteOffer = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM offers WHERE id = $1", [id]);
    res.json({ message: "Offer deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
