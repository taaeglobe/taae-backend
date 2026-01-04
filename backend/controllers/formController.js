const pool = require("../../db");
const transporter = require("../utils/mailer");

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

exports.createForm = async (req, res) => {
  try {
    const { name, email, phoneNumber, message } = req.body;

    // 1️⃣ Save to DB
    const result = await pool.query(
      `INSERT INTO forms (name, email, phone_number, message)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, email, phoneNumber, message]
    );

    // 2️⃣ Email to Admin
    await transporter.sendMail({
      from: `"TAE Globe Contact" <${process.env.SMTP_USER}>`, // VERIFIED EMAIL
      to: process.env.SMTP_USER,
      subject: "📩 New Contact Form Submission",
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phoneNumber}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    // 3️⃣ Auto Reply (safe)
    try {
      await transporter.sendMail({
        from: `"TAE Globe Support" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Thanks for contacting TAE Globe",
        html: `
          <p>Hello ${name},</p>
          <p>Thank you for contacting <strong>TAE Globe</strong>.</p>
          <p>We’ve received your message and will get back to you shortly.</p>
          <br/>
          <p>Best regards,<br/>TAE Globe Team</p>
        `,
      });
    } catch (mailErr) {
      console.error("Auto-reply failed:", mailErr.message);
    }

    res.status(201).json({
      success: true,
      message: "Form submitted successfully",
      data: result.rows[0],
    });

  } catch (err) {
    console.error("FORM ERROR:", err);
    res.status(500).json({ error: "Failed to submit form" });
  }
};
