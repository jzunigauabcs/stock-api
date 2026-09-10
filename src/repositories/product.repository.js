const { store } = require("../data/store");

function findAll() {
  return store.products;
}

function findById(id) {
  return store.products.find((product) => product.id === id);
}

function create(data) {
  const product = {
    id: store.nextProductId++,
    active: true,
    ...data,
  };

  store.products.push(product);
  return product;
}

function update(id, data) {
  const index = store.products.findIndex((product) => product.id === id);

  if (index === -1) {
    return null;
  }

  store.products[index] = {
    ...store.products[index],
    ...data,
    id,
  };

  return store.products[index];
}

function remove(id) {
  const index = store.products.findIndex((product) => product.id === id);

  if (index === -1) {
    return false;
  }

  store.products.splice(index, 1);
  return true;
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
