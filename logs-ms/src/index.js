const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/database");
const Log = require("./models/log.model");

// Environment variables
const PORT = process.env.PORT || 8005;
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
async function readLog(req, res) {
  const { idType, idNumber, date} = req.query;
  const query = { };
  if (idType) query.idType = idType;
  if (idNumber) query.idNumber = idNumber;
  if (date) query.createdAt = { $gte: date + "T00:00:00.000Z", $lt: date + "T23:59:59.999Z" };

  try {
    const log = await Log.find(query).sort({ createdAt: -1 });
    res.status(201).json(log);
    console.log(`log: ${log._id} read successfully!`);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

// Routes
app.get("/", readLog);

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
