const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
    enum: ["create user", "read user", "update user", "delete user"],
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  idType: {
    type: String,
    enum: ["Tarjeta de identidad", "Cedula"],
    required: true,
  },
  idNumber: {
    type: Number,
    required: true,
    validate: {
      validator(num) {
        return num.toString().length >= 1 && num.toString().length <= 10;
      },
      message: "Invalid value for ID number",
    },
  },
});

module.exports = mongoose.model("Log", logSchema);
