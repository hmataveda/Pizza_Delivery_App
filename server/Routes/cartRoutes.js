const CartConroller = require("../Controllers/cartController");
const authenticate = require("../Config/authenticate.middleware");

const CartRoutes = (app) => {
  app.post("/api/addToCart/:id", authenticate, CartConroller.AddtoCart);
  app.get("/api/getAllCartItems", authenticate, CartConroller.getAllCartItems);
  app.put(
    "/api/decreaseCartCount/:id",
    authenticate,
    CartConroller.decreaseCartItemCount
  );
  app.delete(
    "/api/deleteCartItem/:id",
    authenticate,
    CartConroller.deleteCartItem
  );
  app.post("/api/payment", CartConroller.pay);
};

module.exports = CartRoutes;
