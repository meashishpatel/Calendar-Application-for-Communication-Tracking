const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");

// Use environment variables for sensitive data
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key_here"; // Replace in production

// Register
router.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;

  // Validate input fields
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "Username, email, and password are required." });
  }

  // Restrict role assignment
  if (role && !["user", "admin"].includes(role)) {
    return res.status(403).json({ error: "You cannot assign this role." });
  }

  try {
    // Check if email is already registered
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "Email is already registered." });
    }

    // Ensure only a superadmin can create admin accounts
    if (role === "admin" && (!req.user || req.user.role !== "superadmin")) {
      return res
        .status(403)
        .json({ error: "Only superadmin can create admin accounts." });
    }

    // Create a new user
    const newUser = new User({
      username,
      email,
      password, // Password hashing is handled in the User model middleware
      role: role || "user", // Default role is "user"
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    console.error("Error during registration:", err.message);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Validate input fields
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({ message: "Login successful.", token, role: user.role });
  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Middleware for role-based access
const requireRole = (roles) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized access." });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ error: "Access denied." });
      }
      req.user = decoded; // Attach user data to the request object
      next();
    } catch (err) {
      console.error("Error verifying token:", err.message);
      return res.status(401).json({ error: "Invalid or expired token." });
    }
  };
};

// Routes requiring role-based access
router.get(
  "/admin-dashboard",
  requireRole(["admin", "superadmin"]),
  (req, res) => {
    res.status(200).json({ message: "Welcome to the Admin Dashboard!" });
  }
);

router.get("/superadmin-dashboard", requireRole(["superadmin"]), (req, res) => {
  res.status(200).json({ message: "Welcome to the Super Admin Dashboard!" });
});

module.exports = router;
