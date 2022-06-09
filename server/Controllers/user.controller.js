const User = require("../Models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const secret = process.env.secret_key;

const register = async (req, res) => {
  try {
    const userObject = new User(req.body);
    const newUSer = await userObject.save();
    console.log("newUSer", newUSer);
    console.log("sssss", secret);
    const userToken = jwt.sign(
      {
        _id: newUSer._id,
        userName: newUSer.userName,
        emailId: newUSer.email,
        role: newUSer.role,
      },
      secret
    );

    console.log("UserToken", userToken);
    res.status(200).cookie("userToken", userToken).json({
      _id: newUSer._id,
      userName: newUSer.userName,
      emailId: newUSer.emailId,
      role: newUSer.role,
    });
  } catch (err) {
    console.log("Error while registering the new User", err);
    res.json(err);
  }
};

const login = async (req, res) => {
  try {
    const loggedUser = req.body;
    const user = await User.findOne({ emailId: loggedUser.emailId });
    console.log(user.userName);
    if (!user) {
      res.status(400).json({ Error: "Invalid Login" });
    } else {
      console.log(" loggedUser.password", loggedUser.password);
      console.log("user.password", user.password);
      const passwordcheck = await bcrypt.compare(
        loggedUser.password,
        user.password
      );
      if (!passwordcheck) {
        res.status(400).json({ Error: "Invalid login" });
      } else {
        const userToken = jwt.sign(
          {
            _id: user._id,
            emailId: user.emailId,
            userName: user.userName,
            role: user.role,
          },
          secret
        );
        console.log("UserToken", userToken);
        res.status(200).cookie("userToken", userToken).json({
          _id: user._id,
          emailId: user.emailId,
          userName: user.userName,
          role: user.role,
        });
      }
    }
  } catch (err) {
    console.log("Error while Logginng the  User", err);
    res.status(400).json({ message: "Invalid Login" });
  }
};

const logout = (req, res) => {
  res.clearCookie("userToken");
  res.json({ messgae: "successfully logged out" });
};

module.exports = { register, login, logout };
