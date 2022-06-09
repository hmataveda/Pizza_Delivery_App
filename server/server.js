require("./Config/mongoose.config");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const PizzaRoutes = require("./Routes/pizzaRoutes");
const UserRoutes = require("./Routes/userRoutes");
const FavoriteRoutes = require("./Routes/favoriteRoutes");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

PizzaRoutes(app);
UserRoutes(app);
FavoriteRoutes(app);

app.listen(8000, () => {
  console.log("Server is running at the port 8000");
});
