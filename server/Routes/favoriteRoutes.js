const favoriteController = require("../Controllers/favorites.Controller");
const authenticate = require("../Config/authenticate.middleware");

const favoriteRoute = (app) => {
  app.post(
    "/api/favorite/:id",
    authenticate,
    favoriteController.addToFavorites
  );
  app.get(
    "/api/favorites",
    authenticate,
    favoriteController.getAllMyFavoritesPizza
  );
};

module.exports = favoriteRoute;
