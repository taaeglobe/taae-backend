const pool = require("../../db");

// Get all users (admin only)
exports.getUsers = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, phone, role, active FROM users"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Get Users Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Update user status
exports.updateUserStatus = async (req, res) => {
  const { id } = req.params;
  const { active } = req.body;

  try {
    await pool.query("UPDATE users SET active = $1 WHERE id = $2", [
      active,
      id,
    ]);
    res.json({ message: "User status updated successfully" });
  } catch (err) {
    console.error("Update Status Error:", err);
    res.status(500).json({ error: err.message });
  }
};
