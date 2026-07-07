const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const orderRoutes = require("./routes/orderRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Backend Working");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});