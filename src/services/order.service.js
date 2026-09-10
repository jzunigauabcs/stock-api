const productRepository = require("../repositories/product.repository");
const orderRepository = require("../repositories/order.repository");

function getAllOrders() {
  return orderRepository.findAll();
}

function getOrderById(id) {
  return orderRepository.findById(id);
}

function createOrder(data) {
  const errors = [];

  if (!Number.isInteger(data.productId)) {
    errors.push("productId must be an integer");
  }

  if (!Number.isInteger(data.quantity) || data.quantity <= 0) {
    errors.push("quantity must be an integer greater than 0");
  }

  if (errors.length) {
    return { errors };
  }

  const product = productRepository.findById(data.productId);

  if (!product) {
    return { notFound: true, message: "Product not found" };
  }

  if (!product.active) {
    return { conflict: true, message: "Product is inactive" };
  }

  if (data.quantity > product.stock) {
    return { conflict: true, message: "Insufficient stock" };
  }

  const total = product.price * data.quantity;

  productRepository.update(product.id, {
    stock: product.stock - data.quantity,
  });

  const order = orderRepository.create({
    productId: product.id,
    quantity: data.quantity,
    total,
  });

  return { order };
}

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
};
