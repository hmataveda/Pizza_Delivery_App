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

const PizzaSchema = mongoose.Schema(
  {
    size: {
      type: String,
      required: [true, "Please provide the pizza size"],
      enum: ["Large", "Medium", "Small", "X-large"],
    },

    crust: {
      type: String,
      enum: ["Hand Tossed", "Pan Crust", "Thin Crust", "Brooklyn Style"],
      required: [true, "Please provide the pizza crust"],
    },

    toppings: toppingSchema,

    pizzaName: {
      type: String,
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Pizza = mongoose.model("Pizza", PizzaSchema);
module.exports = Pizza;
