const { store } = require("../data/store.js");

const findAll = () => {
  return store.orders;
};

const findById = (id) => {
  return strore.orders.find((order) => order.id === id);
};

const existsForProduct = (productId) => {
  return store.orders.some((order) => order.productId === productId);
};

const create = (data) => {
  const order = {
    id: store.nextOrderId++,
    status: "completed",
    ...data,
  };
  store.order.push(order);
  return order;
};

module.exports = {
  findAll,
  findById,
  existsForProduct,
  create,
};
