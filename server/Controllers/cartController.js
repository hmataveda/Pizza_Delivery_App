const Cart = require("../Models/cartSchema");

const paymentkey = process.env.payment;
console.log("paass", paymentkey);

const stripe = require("stripe")(
  "sk_test_51LJHxIFU8i3UPRgdma9tRLuwdwuZJ7fKhHXTVxjuj1IWrKYQPYNLoXHFGoPerutF2VHsRndfxm7y8ZKdKl5Sknh200PhraZX2Y"
);

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
      // console.log("newItem added to cart", newCartItem);
      const item = await Cart.findOne({ _id: newCartItem._id }).populate(
        "pizzaId"
      );
      res.status(200).json(item);
    }
  } catch (err) {
    console.log("error while adding newItem  to cart", err);
    res.status(400).json(err);
  }
};

getAllCartItems = async (req, res) => {
  try {
    const userId = req.loggedInuser._id;
    const CartItems = await Cart.find({ userId: userId }).populate("pizzaId");
    // console.log("CartItems", CartItems);
    res.status(200).json(CartItems);
  } catch (err) {
    console.log("Error while getting all my favorite Pizzas", err);
    res.status(400).json(err);
  }
};

decreaseCartItemCount = async (req, res) => {
  try {
    const cartItemID = req.params.id;
    const cartItem = await Cart.findById(cartItemID);
    if (cartItem && cartItem.count > 1) {
      const decreaseCount = await Cart.findByIdAndUpdate(
        cartItemID,
        {
          count: cartItem.count - 1,
        },
        { new: true }
      );
      console.log(" Decreased the cart item count");
      res.status(200).json(decreaseCount);
    } else if (cartItem && cartItem.count == 1) {
      const deleteItem = await Cart.findByIdAndDelete(cartItemID);
      console.log("successfully deleted item");
      res.status(200).json(deleteItem);
    }
  } catch (err) {
    console.log("error while decreasing the count", err);
    res.status(400).json(err);
  }
};

deleteCartItem = async (req, res) => {
  try {
    const cartItemID = req.params.id;
    const deleteItem = await Cart.findByIdAndDelete(cartItemID);
    console.log("successfully deleted item");
    res.status(200).json(deleteItem);
  } catch (err) {
    res.status(400).json(err);
    console.log("error while deleting the cartItem", err);
  }
};

pay = async (req, res) => {
  console.log("ee", parseInt(req.body.totalPrice));
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Total Amount",
          },
          unit_amount: Math.round(req.body.totalPrice) * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/pizzaByte/cart",
    cancel_url: "http://localhost:8000/pizzaByte/cart",
  });
  const deleteCartItems = await Cart.deleteMany({});
  res.json({ url: session.url });
};

module.exports = {
  AddtoCart,
  getAllCartItems,
  decreaseCartItemCount,
  deleteCartItem,
  pay,
};
