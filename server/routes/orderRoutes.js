const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrders,
  deleteOrder,
  updateOrderStatus
} = require("../controllers/orderController");

router.get("/", getOrders);
router.post("/", createOrder);
router.delete("/:id", deleteOrder);
router.put("/:id", updateOrderStatus);

module.exports = router;