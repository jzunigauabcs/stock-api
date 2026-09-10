const productService = require("../services/product.service");

function parseId(rawId) {
  const id = Number(rawId);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function listProducts(req, res) {
  res.json(productService.getAllProducts());
}

function getProduct(req, res) {
  const id = parseId(req.params.id);

  if (!id) {
    return res.status(400).json({ error: "Invalid product id" });
  }

  const product = productService.getProductById(id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(product);
}

function createProduct(req, res) {
  const result = productService.createProduct(req.body);

  if (result.errors) {
    return res.status(400).json({ errors: result.errors });
  }

  res.status(201).json(result.product);
}

function updateProduct(req, res) {
  const id = parseId(req.params.id);

  if (!id) {
    return res.status(400).json({ error: "Invalid product id" });
  }

  const result = productService.updateProduct(id, req.body);

  if (result.notFound) {
    return res.status(404).json({ error: "Product not found" });
  }

  if (result.errors) {
    return res.status(400).json({ errors: result.errors });
  }

  res.json(result.product);
}

function deleteProduct(req, res) {
  const id = parseId(req.params.id);

  if (!id) {
    return res.status(400).json({ error: "Invalid product id" });
  }

  const result = productService.deleteProduct(id);

  if (result.notFound) {
    return res.status(404).json({ error: "Product not found" });
  }

  if (result.deactivated) {
    return res.status(200).json({
      message: "Product deactivated because it has related orders",
      product: result.product,
    });
  }

  res.status(204).send();
}

module.exports = {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
