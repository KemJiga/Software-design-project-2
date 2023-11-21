const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/database');

// Environment variables
const PORT = process.env.PORT || 3000;
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

// Routes
app.use('/users', require('./routes/user.routes'));

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
