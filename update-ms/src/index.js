const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/database");
const User = require("./models/user.model");
const Log = require("./models/log.model");

// Environment variables
const PORT = process.env.PORT || 8003;
const dotenv = require("dotenv");
dotenv.config();

// Settings
const app = express();
app.set("port", PORT);
app.set("json spaces", 2);

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Function
async function updateUser(req, res) {
  const { idNumber } = req.query;
  const {
    idType,
    firstName,
    middleName,
    lastName,
    birthDate,
    gender,
    email,
    phone,
    photo,
  } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { idNumber, deletedAt: null },
      {
        idType,
        firstName,
        middleName,
        lastName,
        birthDate,
        gender,
        email,
        phone,
        photo,
        updatedAt: Date.now(),
      },
      {
        new: true,
      }
    );
    const newLog = new Log({ action: "update user", idType, idNumber });
    await newLog.save();
    res.status(201).json(updatedUser);
    console.log(`${firstName} Updated successfully!`);
    console.log(newLog);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

// Routes
app.put("/", updateUser);

// Starting the server
const start = async () => {
  try {
    app.listen(app.get("port"), () => {
      console.log(`Server is running on port ${app.get("port")}`);
    });
  } catch (e) {
    console.log(e.message);
  }
};

connectDB(start);
