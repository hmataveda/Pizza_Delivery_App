const User = require("../Models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const secret = process.env.secret_key;

async function emailing() {
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });
  return transporter;
}

const register = async (req, res) => {
  try {
    const userObject = new User(req.body);
    const newUSer = await userObject.save();
    const userToken = jwt.sign(
      {
        _id: newUSer._id,
        userName: newUSer.userName,
        emailId: newUSer.emailId,
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
    console.log("loggedUser.emailId", loggedUser.emailId);

    const user = await User.findOne({ emailId: loggedUser.emailId });
    if (!user) {
      res.status(400).json({ Error: "Invalid Login" });
    } else {
      const passwordcheck = await bcrypt.compare(
        loggedUser.password,
        user.password
      );
      console.log("passwordcheck", user.password);
      if (!passwordcheck) {
        console.log("loggedUser.password", loggedUser.password);
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

        const transport = await emailing();
        const mailOptions = {
          from: "noreply@findmein.com", // Sender address
          to: "hmata.veda@gmail.com,veda.hm1995@gmail.com", // List of recipients
          subject: "Successfull Login", // Subject line
          text: `Hello ${user.userName}!, Welcome to FindMeIn!`, // Plain text body
        };

        transport.sendMail(mailOptions, function (err, info) {
          if (err) {
            console.log("error while sending email", err);
          } else {
            console.log("sent email successfully", info);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          }
        });

        res.status(200).cookie("userToken", userToken).json({
          _id: user._id,
          emailId: user.emailId,
          userName: user.userName,
          userRole: user.userRole,
        });
      }
    }
  } catch (err) {
    console.log("Error while Logging the  User", err);
    res.status(400).json({ message: "Invalid Login" });
  }
};

const logout = (req, res) => {
  res.clearCookie("userToken");
  res.json({ message: "successfully logged out" });
};

module.exports = { register, login, logout };
