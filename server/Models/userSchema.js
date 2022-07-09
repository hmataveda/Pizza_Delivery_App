const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "userName is Required"],
      minlength: [4, "Name must be atleast 4 characters long"],
    },

    emailId: {
      type: String,
      required: [true, "Email is Required"],
    },

    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [4, "password must be more than 8"],
    },

    userRole: {
      type: String,
      required: [true, "User role is required"],
      enum: ["Owner", "Customer"],
      default: "Customer",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

UserSchema.pre("validate", function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Password must match");
  }
  next();
});

UserSchema.pre("save", async function (next) {
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (err) {
    console.log("ERROR in hashing", err);
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
