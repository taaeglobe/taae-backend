const TeamMember = require("../models/teamModel");
const pool = require("../../db");
exports.getTeam = async (req, res) => {
  try {
    const team = await pool.query(
      "SELECT * FROM team_members ORDER BY id DESC"
    );
    res.json(team.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch team members" });
  }
};

exports.createTeamMember = async (req, res) => {
  try {
    const { name, role, phone, email } = req.body;
    const image = req.file?.filename || null;

    const newMember = await pool.query(
      "INSERT INTO team_members (name,role,phone,email,image) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [name, role, phone, email, image]
    );
    res.status(201).json(newMember.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create team member" });
  }
};

exports.updateTeamMember = async (req, res) => {
  const { id } = req.params;
  const { name, role, phone, email } = req.body;
  // const image = req.file?.filename;
  try {
    let query = "";
    let values = [];
    if (req.file) {
      query =
        "UPDATE team_members SET name= $1, role = $2, phone = $3, email=$4, image=$5 WHERE id = $6 RETURNING *";
      values = [name, role, phone, email, req.file?.filename, id];
    } else {
      query =
        "UPDATE team_members SET name = $1, role = $2, phone=$3, email=$4 WHERE id = $5 RETURNING *";
      values = [name, role, phone, email, id];
    }
    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTeamMember = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM team_members WHERE id=$1", [id]);
    res.json({ message: "Member deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
