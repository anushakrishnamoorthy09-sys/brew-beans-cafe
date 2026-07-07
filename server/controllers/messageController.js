const pool = require("../config/db");

const createMessage = async (req, res) => {
  try {
    const {
      name,
      email,
      subject,
      message
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO messages
      (name, email, subject, message)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [
        name,
        email,
        subject,
        message
      ]
    );

    res.status(201).json({
      success: true,
      message: "Message sent successfully!",
      data: result.rows[0]
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

module.exports = {
  createMessage
};