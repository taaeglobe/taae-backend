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

    // Save to database
    const result = await pool.query(
      `INSERT INTO forms (name, email, phone_number, message)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, email, phoneNumber, message]
    );

    // 📧 Email to Admin
    await transporter.sendMail({
      from: `"Website Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: "📩 New Contact Form Submission",
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phoneNumber}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    // 📧 Auto Reply to User (Optional but Recommended)
    await transporter.sendMail({
      from: `"Support Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thanks for contacting us!",
      html: `
        <p>Hello ${name},</p>
        <p>Thank you for reaching out to us. We have received your message and will contact you shortly.</p>
        <p><strong>Your Message:</strong><br/>${message}</p>
        <br/>
        <p>Best regards,<br/>Support Team</p>
      `,
    });

    res.status(201).json({
      success: true,
      message: "Form submitted and email sent",
      data: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to submit form" });
  }
};

