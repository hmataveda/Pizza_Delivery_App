const UserController = require("../Controllers/user.controller");
const authenticate = require("../Config/authenticate.middleware");

const userRoutes = (app) => {
  app.post("/api/register", UserController.register);
  app.post("/api/login", UserController.login);
  app.post("/api/logout", UserController.logout);
};

module.exports = userRoutes;
