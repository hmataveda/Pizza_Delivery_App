const mongoose = require("mongoose");
const User = require("./userSchema");

const toppingSchema = mongoose.Schema({
  meats: {
    type: [String],
    enum: [
      "Ham",
      "Beef",
      "Salami",
      "Pepperoni",
      "Italian Sausage",
      "Premium Chicken",
      "Bacon",
      "Philly steak",
    ],
  },
  veg: {
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
  // method: {
  //   type: String,
  //   required: [true, "Delivery method is required"],
  //   enum: ["Delivery", "Carryout"],
  // },

  size: {
    type: String,
    require: [true, "pizza size is required"],
    enum: ["Large", "Medium", "Small", "X-large"],
  },

  crust: {
    type: String,
    enum: ["Hand Tossed", "Pan Crust", "Thin Crust", "Brooklyn Style"],
    default: "Thin",
  },
  toppings: toppingSchema,
  pizzaName: {
    type: String,
  },
  image: {
    type: String,
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  // Toppings: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "ToppingSchema",
  // },
});

const Pizza = mongoose.model("Pizza", PizzaSchema);
module.exports = Pizza;
