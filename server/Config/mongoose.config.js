const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/Pizza_Project", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("established connection to the Pizza_Project database");
  })
  .catch((err) => {
    console.log("Something went wrong while connecting to the database", err);
  });
