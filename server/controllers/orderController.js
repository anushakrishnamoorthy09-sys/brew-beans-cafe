const pool = require("../config/db");

const createOrder = async (req, res) => {
  try {
    const {
      customer_name,
      customer_email,
      items,
      total_amount
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO orders
      (
        customer_name,
        customer_email,
        items,
        total_amount
      )
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [
        customer_name,
        customer_email,
        JSON.stringify(items),
        total_amount
      ]
    );

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      order: result.rows[0]
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};
const getOrders = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM orders ORDER BY created_at DESC"
    );

    res.json(result.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM orders WHERE id = $1",
      [id]
    );

    res.json({
      message: "Order deleted successfully"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await pool.query(
      `
      UPDATE orders
      SET status = $1
      WHERE id = $2
      RETURNING *
      `,
      [status, id]
    );

    res.json({
      message: "Status updated successfully",
      order: result.rows[0]
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};
module.exports = {
  createOrder,
  getOrders,
  deleteOrder,
  updateOrderStatus
};