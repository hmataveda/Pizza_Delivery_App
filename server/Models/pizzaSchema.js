const mongoose = require("mongoose");
const User = require("./userSchema");

const ToppingSchema = mongoose.Schema({
  Meats: {
    type: [String],
    enum: [
      "Ham",
      "Beef",
      "Salami",
      "Pepperoni",
      "Italian Sausage",
      "Premium Chicken",
      "bacon",
      "Philly steak",
    ],
  },
  Veg: {
    type: [String],
    enum: [
      "Garlic",
      "Jalopeno Peppers",
      "Onions",
      "Bananapeppers",
      "Diced Tomatoes",
      "Black Olives",
      "Mushrooms",
      "Pienaple",
      "Shredded Provolone Cheese",
      "Green Peppers",
      "Spinach",
      "Roasted Red Peppers",
      "Feta Cheese",
      "Shredded Parmesan Asiago",
    ],
  },
});

const PizzaSchema = mongoose.Schema({
  method: {
    type: String,
    required: [true, "Delivery method is required"],
    enum: ["Delivery", "Carryout"],
  },
  pizzaName: {
    type: String,
  },
  size: {
    type: String,
    require: [true, "pizza size is required"],
    enum: ["Large", "Medium", "Small"],
  },
  crust: {
    type: String,
    enum: ["Hand Tossed", "Handmade Pan", "Hand Crust", "Brooklyn Style"],
    default: "Thin",
  },
  me: [String],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  // Toppings: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "ToppingSchema",
  // },
  Toppings: ToppingSchema,
});

const Pizza = mongoose.model("Pizza", PizzaSchema);
module.exports = Pizza;
