// CartItem Model
// This model represents an item in a user's shopping cart
// It connects a User to a Product with a quantity
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CartItem = sequelize.define(
  "CartItem",
  {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: [1],
        max: [99],
      },
    },
  },
  {
    tableName: "cart_items",
  },
);

module.exports = CartItem;
