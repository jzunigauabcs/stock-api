const express = require("express");

const {
  listOrders,
  getOrder,
  createOrder,
} = require("../controllers/order.controller");
const { route } = require("../app");

const router = express.Router();

router.get("/", listOrders);
router.get("/:id", getOrder);
router.post("/", createOrder);

module.exports = router;
