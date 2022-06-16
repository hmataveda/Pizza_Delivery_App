const { response } = require("express");
const Cart = require("../Models/cartSchema");

AddtoCart = async (req, res) => {
  try {
    const userId = req.loggedInuser._id;
    const pizzaId = req.params.id;
    const pizza = await Cart.findOne({ userId, pizzaId });
    if (pizza) {
      const updatePizzaCount = await Cart.findOneAndUpdate(
        { userId, pizzaId },
        { count: pizza.count + 1 },
        { new: true }
      );
      console.log("Updated pizza count", updatePizzaCount);
      res.status(200).json(updatePizzaCount);
    } else {
      const cartItem = new Cart({ pizzaId, userId, count: 1 });
      const newCartItem = await cartItem.save();
      console.log("newItem added to cart", newCartItem);
      res.status(200).json(newCartItem);
    }
  } catch (err) {
    console.log("error while adding newItem  to cart", newCartItem);
    res.status(400).json(err);
  }
};

getAllCartItems = async (req, res) => {
  try {
    const userId = req.loggedInuser._id;
    const CartItems = await Cart.find({ userId: userId }).populate("pizzaId");
    console.log("CartItems", CartItems);
    res.status(200).json(CartItems);
  } catch (err) {
    console.log("Error while getting all my favorite Pizzas", err);
    res.status(400).json(err);
  }
};

module.exports = { AddtoCart, getAllCartItems };
