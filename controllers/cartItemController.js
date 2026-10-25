// Cart Item Controller - Handles all cart item-related business logic
// Cart items are special because they connect Users and Products together,
// so we need to use "eager loading" (the include option) to fetch related data
const { CartItem, User, Product } = require("../models");

// Get all cart items with populated user and product information
// TODO: Implement this function
// This is similar to getAllUsers, but we add an "include" option to findAll()
// to also load the related User and Product data for each cart item.
//
// Example of eager loading:
//   CartItem.findAll({
//     include: [
//       { model: User, attributes: ['id', 'name', 'email'] },
//       { model: Product, attributes: ['id', 'name', 'price'] }
//     ]
//   })
exports.getAllCartItems = async (request, response) => {
  try {
    const cartItems = await CartItem.findAll({
      include: [
        { model: User, attributes: ["id", "name", "email"] },
        { model: Product, attributes: ["id", "name", "price"] },
      ],
    });
    response.status(200).json(cartItems);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

// Get cart items for a specific user
// TODO: Implement this function
// Use CartItem.findAll() with a "where" clause to filter by userId
// and "include" to load the Product data
//
// Hint: { where: { userId: request.params.userId }, include: [...] }
exports.getCartItemsByUser = async (request, response) => {
  try {
    // TODO: Find all cart items for a specific user, include product data
    const cartItems = await CartItem.findAll({
      include: [
        { model: Product, attributes: ["id", "name", "price"] },
      ],
      where: {
        userId: request.params.userId
      }
    });
    response.status(200).json(cartItems);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

// Get single cart item by ID
// TODO: Implement this function
// Use CartItem.findByPk() with include to load User and Product data
// Remember to handle the 404 case!
exports.getCartItemById = async (request, response) => {
  try {
    // TODO: Find cart item by ID with includes, handle 404
    const cartItem = await CartItem.findByPk(request.params.id, {
      include: [
        { model: User, attributes: ["id", "name", "email"] },
        { model: Product, attributes: ["id", "name", "price"] },
      ],
    });

    if (!cartItem) {
      return response.status(404).json({ message: "Cart item not found" });
    } else {
      response.status(200).json(cartItem);
    }

  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

// Add item to cart
// TODO: Implement this function
// Steps:
//   1. Create the cart item using CartItem.create(request.body)
//      The request body should contain: userId, productId, quantity
//   2. After creating, fetch it again with findByPk and include
//      so the response includes the full User and Product data
//   3. Send the populated cart item with status 201
exports.createCartItem = async (request, response) => {
  try {
    const cartItem = await CartItem.create(request.body);

    const populatedCartItem = await CartItem.findByPk(cartItem.id, {
      include: [
        { model: User, attributes: ["id", "name", "email"] },
        { model: Product, attributes: ["id", "name", "price"] },
      ],
    });

    response.status(201).json(populatedCartItem);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// Update cart item by ID (typically to change quantity)
// TODO: Implement this function
// Steps:
//   1. Find the cart item by ID
//   2. If not found, send 404
//   3. Update it with request.body
//   4. Fetch it again with includes for the full response
//   5. Send the populated cart item
exports.updateCartItem = async (request, response) => {
  try {
    // TODO: Find, check exists, update, fetch with includes, send back
    const cartItem = await CartItem.findByPk(request.params.id);

    if (!cartItem) {
      return response.status(404).json({ error: "Cart Item not found"});
    } else {
      await cartItem.update(request.body);
    }

    const populatedCartItem = await CartItem.findByPk(cartItem.id, {
      include: [{ model: User }, { model: Product }],
    });

    response.status(200).json(populatedCartItem);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// Delete cart item by ID (remove from cart)
// TODO: Implement this function
// Same pattern as deleteUser: find, check exists, destroy, send message
exports.deleteCartItem = async (request, response) => {
  try {
    // TODO: Find cart item, check if exists, delete, send success message
    const cartItem = await CartItem.findByPk(request.params.id);

    if (!cartItem) {
      return response.status(404).json({ error: "Cart Item not found" });
    } else {
      await cartItem.destroy();
      response.status(200).json( { message: "Cart item deleted successfully" });
    }
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};
