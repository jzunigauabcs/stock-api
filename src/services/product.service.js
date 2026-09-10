const productRepository = require("../repositories/product.repository");
const orderRepository = require("../repositories/order.repository");

function validateProduct(data, partial = false) {
  const errors = [];

  if (!partial || data.name !== undefined) {
    if (typeof data.name !== "string" || data.name.trim().length < 3) {
      errors.push("name must be a string with at least 3 characters");
    }
  }

  if (!partial || data.price !== undefined) {
    if (typeof data.price !== "number" || data.price <= 0) {
      errors.push("price must be greater than 0");
    }
  }

  if (!partial || data.stock !== undefined) {
    if (!Number.isInteger(data.stock) || data.stock < 0) {
      errors.push("stock must be an integer greater than or equal to 0");
    }
  }

  if (!partial || data.category !== undefined) {
    if (typeof data.category !== "string" || data.category.trim() === "") {
      errors.push("category is required");
    }
  }

  if (data.active !== undefined && typeof data.active !== "boolean") {
    errors.push("active must be boolean");
  }

  return errors;
}

function getAllProducts() {
  return productRepository.findAll();
}

function getProductById(id) {
  return productRepository.findById(id);
}

function createProduct(data) {
  const errors = validateProduct(data);

  if (errors.length) {
    return { errors };
  }

  return {
    product: productRepository.create({
      name: data.name.trim(),
      price: data.price,
      stock: data.stock,
      category: data.category.trim(),
      active: data.active ?? true,
    }),
  };
}

function updateProduct(id, data) {
  const product = productRepository.findById(id);

  if (!product) {
    return { notFound: true };
  }

  const errors = validateProduct(data, true);

  if (errors.length) {
    return { errors };
  }

  const normalized = { ...data };

  if (normalized.name !== undefined) {
    normalized.name = normalized.name.trim();
  }

  if (normalized.category !== undefined) {
    normalized.category = normalized.category.trim();
  }

  return {
    product: productRepository.update(id, normalized),
  };
}

function deleteProduct(id) {
  const product = productRepository.findById(id);

  if (!product) {
    return { notFound: true };
  }

  if (orderRepository.existsForProduct(id)) {
    const updated = productRepository.update(id, { active: false });
    return { deactivated: true, product: updated };
  }

  productRepository.remove(id);
  return { deleted: true };
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
