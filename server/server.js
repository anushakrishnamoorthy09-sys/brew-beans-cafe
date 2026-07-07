const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const orderRoutes = require("./routes/orderRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const messageRoutes = require("./routes/messageRoutes");

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/orders", orderRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/messages", messageRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("Backend Working");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});