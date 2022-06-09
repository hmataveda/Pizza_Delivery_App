const mongoose = require("mongoose");

const FavroriteSchema = mongoose.Schema({
  pizzaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pizza",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Favorite = mongoose.model("Favorite", FavroriteSchema);

module.exports = Favorite;
