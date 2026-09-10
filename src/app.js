const express = require("express");
const productRoutes = require("./routes/product.routers");
const orderRoutes = require("./routes/order.routes");

const app = express();

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

module.exports = app;
