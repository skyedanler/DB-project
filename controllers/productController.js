// Product Controller - Handles all product-related business logic
const { Product } = require("../models");

exports.getAllProducts = async (request, response) => {
  try {
    const products = await Product.findAll();
    response.status(200).json(products);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

exports.getProductById = async (request, response) => {
  try {
    // TODO: Find product by ID, handle 404, send as JSON
    const product = await Product.findByPk(request.params.id);
    if (!product) {
      response.status(404).json({ error: "Product not found" });
    } else {
      response.status(200).json(product);
    }
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

// Create new product
// TODO: Implement this function
// This works exactly like createUser - use Product.create(request.body)
// Send back the new product with status 201
exports.createProduct = async (request, response) => {
  try {
    // TODO: Create a new product from request.body and send with status 201
    const product = await Product.create(request.body);
    response.status(201).json(product);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// Update product by ID
// TODO: Implement this function
// Same pattern as updateUser: find, check exists, update, send back
exports.updateProduct = async (request, response) => {
  try {
    // TODO: Find product, check if exists, update, send back
    const product = await Product.findByPk(request.params.id);

    if (product) {
      await product.update(request.body);
      response.status(200).json(product);
    } else {
      response.status(404).json({ error: 'Product not found'});
    }
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// Delete product by ID
// TODO: Implement this function
// Same pattern as deleteUser: find, check exists, destroy, send message
exports.deleteProduct = async (request, response) => {
  try {
    // TODO: Find product, check if exists, delete, send success message
    const product = await Product.findByPk(request.params.id);

    if (product) {
      await product.destroy();
      response.status(200).json({ message: "Product deleted successfully"});
    } else {
      response.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};
