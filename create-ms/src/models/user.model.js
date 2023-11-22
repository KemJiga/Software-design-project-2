const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  idType: {
    type: String, 
    enum: ['Tarjeta de identidad', 'Cedula'], 
    required: true,
  },
  idNumber: {
    type: Number, 
    required: true,
    validate: {
        validator(num) {
          return num.toString().length >= 1 && num.toString().length <= 10;
        },
        message: 'Invalid value for ID number',
      },
  },
  firstName: {
    type: String,
    required: true,
    validate: {
      validator(cad) {
        return cad.length > 0 && cad.length <= 30;
      },
      message: 'Invalid value for first name',
    },
  },
  middleName: {
    type: String,
    validate: {
      validator(cad) {
        return cad.length > 0 && cad.length <= 30;
      },
      message: 'Invalid value for middle name',
    },
  },
  lastName: {
    type: String,
    required: true,
    validate: {
      validator(cad) {
        return cad.length > 0 && cad.length <= 60;
      },
      message: 'Invalid value for last name',
    },
  },
  birthDate: {
    type: Date, 
    required: true,
  },
  gender: {
    type: String,
    enum: ['Masculino', 'Femenino', 'No binario', 'Prefiero no reportarlo'],
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  phone: {
    type: Number, 
    required: true,
    validate: {
      validator(num) {
        return num.toString().length >= 1 && num.toString().length <= 10;
      },
      message: 'Invalid value for phone number',
    },
  },
  photo: {
    type: String, 
    required: true,
    max: 2 * 1024 * 1024, // Max file size in bytes (2MB)
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: {
    type: Date, 
    default: null,
  },
  updatedAt: {
    type: Date, 
    default: null,
  },
});

module.exports = mongoose.model('User', userSchema);
