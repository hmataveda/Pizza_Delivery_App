const User = require("../Models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const secret = process.env.secret_key;

const register = async (req, res) => {
  try {
    const userObject = new User(req.body);
    const newUSer = await userObject.save();
    const userToken = jwt.sign(
      {
        _id: newUSer._id,
        userName: newUSer.userName,
        emailId: newUSer.email,
        userRole: newUSer.userRole,
      },
      secret
    );

    console.log("UserToken", userToken);
    res.status(200).cookie("userToken", userToken).json({
      _id: newUSer._id,
      userName: newUSer.userName,
      emailId: newUSer.emailId,
      userRole: newUSer.userRole,
    });
  } catch (err) {
    console.log("Error while registering the new User", err);
    res.status(400).json(err);
  }
};

const login = async (req, res) => {
  try {
    const loggedUser = req.body;
    const user = await User.findOne({ emailId: loggedUser.emailId });
    if (!user) {
      res.status(400).json({ Error: "Invalid Login" });
    } else {
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
            userRole: user.userRole,
          },
          secret
        );
        console.log("UserToken", userToken);
        res.status(200).cookie("userToken", userToken).json({
          _id: user._id,
          emailId: user.emailId,
          userName: user.userName,
          userRole: user.userRole,
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
  res.json({ message: "successfully logged out" });
};

module.exports = { register, login, logout };
