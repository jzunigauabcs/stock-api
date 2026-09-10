const getInitialProducts = () => {
  return [
    {
      id: 1,
      name: "Laptop",
      price: 10000,
      stock: 5,
      category: "Computers",
      active: true,
    },
    {
      id: 2,
      name: "Mouse",
      price: 599,
      stock: 10,
      category: "Accessories",
      active: true,
    },
  ];
};

const store = {
  products: getInitialProducts(),
  orders: [],
  nextProductId: 3,
  nextOrderId: 1001,
};

const resetStore = () => {
  store.products = getInitialProducts();
  store.orders = [];
  store.nextProductId = 3;
  store.nextOrderId = 1001;
};

module.exports = {
  store,
  resetStore,
};
