const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.secret_key;
const User = require("../Models/userSchema");

const authenticate = async (req, res, next) => {
  try {
    const userPayload = jwt.verify(req.cookies.userToken, secret);
    const user = await User.findOne({ _id: userPayload._id });
    if (user) {
      req.loggedInuser = userPayload;
      console.log(" authenticated user");
      next();
    } else {
      console.log("unAuthenticated user");
    }
  } catch (err) {
    res.json(err);
  }
};

module.exports = authenticate;
