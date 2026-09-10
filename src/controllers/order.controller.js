const orderService = require("../services/order.service");

function parseId(rawId) {
  const id = Number(rawId);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function listOrders(req, res) {
  res.json(orderService.getAllOrders());
}

function getOrder(req, res) {
  const id = parseId(req.params.id);

  if (!id) {
    return res.status(400).json({ error: "Invalid order id" });
  }

  const order = orderService.getOrderById(id);

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  res.json(order);
}

function createOrder(req, res) {
  const result = orderService.createOrder(req.body);

  if (result.errors) {
    return res.status(400).json({ errors: result.errors });
  }

  if (result.notFound) {
    return res.status(404).json({ error: result.message });
  }

  if (result.conflict) {
    return res.status(409).json({ error: result.message });
  }

  res.status(201).json(result.order);
}

module.exports = {
  listOrders,
  getOrder,
  createOrder,
};
