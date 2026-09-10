const request = require("supertest");
const app = require("../src/app");
const { resetStore } = require("../src/data/store");

beforeEach(() => {
  resetStore();
});

describe("Orders API", () => {
  test("POST /api/orders creates an order and decreases stock", async () => {
    const orderResponse = await request(app).post("/api/orders").send({
      productId: 1,
      quantity: 2,
    });

    expect(orderResponse.statusCode).toBe(201);
    expect(orderResponse.body.total).toBe(20000);

    const productResponse = await request(app).get("/api/products/1");
    expect(productResponse.body.stock).toBe(3);
  });

  test("POST /api/orders rejects a quantity greater than available stock", async () => {
    const response = await request(app).post("/api/orders").send({
      productId: 1,
      quantity: 6,
    });

    expect(response.statusCode).toBe(409);
  });

  test("POST /api/orders accepts quantity exactly equal to stock", async () => {
    const response = await request(app).post("/api/orders").send({
      productId: 1,
      quantity: 5,
    });

    expect(response.statusCode).toBe(201);

    const productResponse = await request(app).get("/api/products/1");
    expect(productResponse.body.stock).toBe(0);
  });
});
