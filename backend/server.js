const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const CommunicationMethod = require("./models/CommunicationMethod");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use(
  cors({
    origin:
      "https://calendar-application-for-communication-tracking-drab.vercel.app/",
  })
);

// Default Methods Initialization
const initializeDefaultMethods = async () => {
  const defaultMethods = [
    {
      name: "LinkedIn Post",
      description: "Post on LinkedIn",
      sequence: 1,
      mandatory: true,
    },
    {
      name: "LinkedIn Message",
      description: "Send a LinkedIn message",
      sequence: 2,
      mandatory: true,
    },
    {
      name: "Email",
      description: "Send an email",
      sequence: 3,
      mandatory: true,
    },
    {
      name: "Phone Call",
      description: "Call the company",
      sequence: 4,
      mandatory: false,
    },
    {
      name: "Other",
      description: "Any other communication method",
      sequence: 5,
      mandatory: false,
    },
  ];

  try {
    const existingMethods = await CommunicationMethod.find();
    if (existingMethods.length === 0) {
      await CommunicationMethod.insertMany(defaultMethods);
      console.log("Default communication methods initialized.");
    } else {
      console.log("Default communication methods already exist.");
    }
  } catch (err) {
    console.error("Error initializing default communication methods:", err);
  }
};

// Call the initialization function after connecting to the database
connectDB().then(() => {
  initializeDefaultMethods();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
