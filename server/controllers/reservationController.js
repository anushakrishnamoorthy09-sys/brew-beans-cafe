const pool = require("../config/db");

// CREATE RESERVATION
const createReservation = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      reservation_date,
      reservation_time,
      guests,
      special_requests
    } = req.body;

    const result = await pool.query(
      `INSERT INTO reservations
      (name, email, phone, reservation_date, reservation_time, guests, special_requests)
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *`,
      [
        name,
        email,
        phone,
        reservation_date,
        reservation_time,
        guests,
        special_requests
      ]
    );

    res.status(201).json({
      success: true,
      message: "Reservation created successfully!",
      reservation: result.rows[0]
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

// GET ALL RESERVATIONS
const getReservations = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM reservations ORDER BY id DESC"
    );

    res.json(result.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

//delete reservation
const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM reservations WHERE id=$1",
      [id]
    );

    res.json({
      message: "Reservation deleted successfully"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

module.exports = {
  createReservation,
  getReservations,
  deleteReservation
};