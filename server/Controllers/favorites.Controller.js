const Favorite = require("../Models/FavoritesSchema");

const getAllMyFavoritesPizza = async (req, res) => {
  try {
    const userId = req.loggedInuser._id;
    const favPizzas = await Favorite.find({ userId: userId }).populate(
      "pizzaId"
    );

    console.log("Got all my favorite Pizzas");
    res.status(200).json(favPizzas);
  } catch (err) {
    console.log("Error while getting all my favorite Pizzas", err);
    res.status(400).json(err);
  }
};

const addToFavorites = (req, res) => {
  const userId = req.loggedInuser._id;
  const pizzaId = req.params.id;
  Favorite.create({ userId, pizzaId })
    .then((favPizza) => {
      console.log("Added  my  Pizza to favorite Collection");
      res.status(200).json(favPizza);
    })
    .catch((err) => {
      console.log("Error while adding Pizza to favorite Collection");
      res.status(400).json(err);
    });
};

module.exports = { getAllMyFavoritesPizza, addToFavorites };
