const Pizza = require("../Models/pizzaSchema");
const User = require("../Models/userSchema");
const Favorite = require("../Models/FavoritesSchema");

const createPizza = async (req, res) => {
  try {
    console.log("obj", req.body);
    const PizzaObj = new Pizza({
      ...req.body,
      createdBy: req.loggedInuser._id,
    });
    const newPizza = await PizzaObj.save();
    console.log("new pizza created", newPizza);
    res.status(200).json(newPizza);
  } catch (err) {
    console.log("ERROR USER CREATION", err);
    res.status(400).json(err);
  }
};

const getAllPizzaCreatedByAdmin = async (req, res) => {
  try {
    const admin = await User.findOne({ userRole: "Owner" });
    const PizzasByAdmin = await Pizza.find({ createdBy: admin._id }).populate(
      "createdBy",
      "userRole userName"
    );
    console.log("got all pizza created by owner");
    res.status(201).json(PizzasByAdmin);
  } catch (err) {
    console.log("ERROR While getting all pizzas created by owner", err);
    res.status(400).json(err);
  }
};

const getAllPizzaCreatedByCustomer = async (req, res) => {
  try {
    // const customer = req.user;// through authenticate;
    // const customer = await User.find({ name: req.params.name });
    const PizzasByCustomer = await Pizza.find({
      createdBy: req.loggedInuser._id,
    }).populate("createdBy");
    res.status(200).json(PizzasByCustomer);
    console.log("got all pizza created by Customer", PizzasByCustomer);
  } catch (err) {
    console.log("ERROR While getting all pizzas created by Customer", err);
    res.status(400).json(err);
  }
};

const getAllPizza = async (req, res) => {
  try {
    console.log("req", req.loggedInuser);
    const allPizza = await Pizza.find({}).populate(
      "createdBy",
      "userName role emailId"
    );
    res.status(200).json(allPizza);
  } catch (err) {
    console.log("ERROR While getting all pizzas ", err);
    res.status(400).json(err);
  }
};

module.exports = {
  createPizza,
  getAllPizzaCreatedByAdmin,
  getAllPizzaCreatedByCustomer,
  getAllPizza,
};
