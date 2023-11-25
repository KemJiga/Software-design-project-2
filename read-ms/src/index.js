const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/database');
const User = require('./models/user.model');
const Log = require('./models/log.model');

// Environment variables
const PORT = process.env.PORT || 8002;
const dotenv = require('dotenv');
dotenv.config();

// Settings
const app = express();
app.set('port', PORT);
app.set('json spaces', 2);

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Function
async function readUser(req, res) {
  const { idType, idNumber} = req.query;
  try {
    const user = await User.find({ idType, idNumber, deletedAt: null });
    if (user.length === 0) {
      res.status(404).json({ error: 'User not found' });
      console.log(`${idType} ${idNumber} not found!`);
    }else{
      const newLog = new Log({ action: 'read user', idType, idNumber });
      await newLog.save();
      res.status(201).json(user);
      console.log(`${user.firstName} read successfully!`);
      console.log(newLog);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function readDeletedUser(req, res) {
  const { idType, idNumber} = req.query;
  try {
    const user = await User.find({ idType, idNumber, deletedAt: { $ne: null } });
    const newLog = new Log({ action: 'read user', idType, idNumber });
    await newLog.save();
    res.status(201).json(user);
    console.log(`${user.firstName} read successfully!`);
    console.log(newLog);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function login(req, res) {
  const { idNumber } = req.query;
  try {
    const user = await User.find({ idNumber, deletedAt: null });
    res.status(201).json(user);
    console.log(`${user.firstName} read successfully!`);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

// Routes
app.get('/', readUser);
app.get('/deleted', readDeletedUser);
app.get('/log', login);

// Starting the server
const start = async () => {
  try {
    app.listen(app.get('port'), () => {
      console.log(`Server is running on port ${app.get('port')}`);
    });
  } catch (e) {
    console.log(e.message);
  }
};

connectDB(start);