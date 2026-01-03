const pool = require("../../db");

// Get all destinations
exports.getDestinations = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM popular_destinations ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// get a single destination
exports.getSingleDestination = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM popular_destinations WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Destination not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all international destinations
exports.getInternationalDestinations = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM popular_destinations WHERE type = 'international' ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all domestic destinations
exports.getDomesticDestinations = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM popular_destinations WHERE type = 'domestic' ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new destination
exports.createDestination = async (req, res) => {
  const { place_name, description, type } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const result = await pool.query(
      "INSERT INTO popular_destinations (place_name, description, type, image) VALUES ($1, $2, $3, $4) RETURNING *",
      [place_name, description, type, image]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a destination
exports.updateDestination = async (req, res) => {
  const { id } = req.params;
  const { place_name, description, type } = req.body;

  try {
    let query = "";
    let values = [];

    if (req.file) {
      query =
        "UPDATE popular_destinations SET place_name = $1, description = $2, type = $3, image = $4 WHERE id = $5 RETURNING *";
      values = [place_name, description, type, req.file.filename, id];
    } else {
      query =
        "UPDATE popular_destinations SET place_name = $1, description = $2, type = $3 WHERE id = $4 RETURNING *";
      values = [place_name, description, type, id];
    }

    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a destination
exports.deleteDestination = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM popular_destinations WHERE id = $1", [id]);
    res.json({ message: "Destination deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
