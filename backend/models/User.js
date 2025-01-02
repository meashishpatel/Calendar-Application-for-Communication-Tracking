const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "admin", "superadmin"],
    default: "user",
    required: true,
  },
});

// Password hashing middleware
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Password comparison method
UserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Static method to check for existing superadmin
UserSchema.statics.isSuperAdminExist = async function () {
  const superAdmin = await this.findOne({ role: "superadmin" });
  return !!superAdmin;
};

// Enforce single superadmin rule
UserSchema.pre("save", async function (next) {
  if (this.role === "superadmin") {
    const superAdminExists = await mongoose.model("User").isSuperAdminExist();
    if (superAdminExists) {
      const error = new Error("A superadmin already exists.");
      error.status = 403; // Forbidden
      return next(error);
    }
  }
  next();
});

module.exports = mongoose.model("User", UserSchema);
