const CartConroller = require("../Controllers/cartController");
const authenticate = require("../Config/authenticate.middleware");

const CartRoutes = (app) => {
  app.post("/api/addToCart/:id", authenticate, CartConroller.AddtoCart);
  app.get("/api/getAllCartItems", authenticate, CartConroller.getAllCartItems);
};

module.exports = CartRoutes;
