const pizzaController = require("../Controllers/pizzaController");
const authenticate = require("../Config/authenticate.middleware");

const PizzaRoutes = (app) => {
  app.post("/api/newpizza", authenticate, pizzaController.createPizza);
  app.get(
    "/api/orders",
    authenticate,
    pizzaController.getAllPizzaCreatedByCustomer
  );
  app.get(
    "/api/ownerpizza",
    authenticate,
    pizzaController.getAllPizzaCreatedByAdmin
  );
  app.get("/api/allpizza", authenticate, pizzaController.getAllPizza);
  app.put("/api/updatepizza/:id", authenticate, pizzaController.updatePizza);
  app.delete("/api/deletepizza/:id", authenticate, pizzaController.deletePizza);
};
module.exports = PizzaRoutes;
