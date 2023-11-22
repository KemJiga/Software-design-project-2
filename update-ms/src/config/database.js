const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const CONNECTION = process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/businessDB`;
const connectDB = async (cb) => {
    try {
        await mongoose.connect(CONNECTION)
            .then(db => console.log('Database connected'))
            .catch(err => console.log(err.message));
        cb();
    } catch (e) {
        console.log(e.message);
    }
}

module.exports = connectDB;
