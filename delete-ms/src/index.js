const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/database');
const User = require('./models/user.model');
const Log = require('./models/log.model');

// Environment variables
const PORT = process.env.PORT || 8004;
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
async function deleteUser(req, res) {
  const { idType, idNumber} = req.query;
  try {
    const user = await User.findOneAndUpdate({idNumber}, { deletedAt: Date.now() }, {new: true});
    const newLog = new Log({ action: 'delete user', idType, idNumber });
    await newLog.save();
    res.status(201).json(user);
    console.log(`${user.firstName} delete successfully!`);
    console.log(newLog);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

// Routes
app.delete('/', deleteUser);

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