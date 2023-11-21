const User = require('../models/user.model');

async function createUser(req, res) {
    const { idType, idNumber, firstName, middleName, lastName, birthDate, gender, email, phone, photo } = req.body;
    try {
      const newUser = new User({ idType, idNumber, firstName, middleName, lastName, birthDate, gender, email, phone, photo });
      await newUser.save();
      res.status(201).json(newUser);
      console.log('user added');
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

async function getUser(req, res) {
    // se obtiene del query o del body?
    const { idType, idNumber } = req.query;
    try {
      const user = await User.find({ idType, idNumber, deletedAt: null });
      if (user === null || user.length === 0) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(200).json(user);
        console.log('user displayed');
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

async function getAllUsers(req, res) {
    try {
      const users = await User.find({ deletedAt: null });
      if (users === null || users.length === 0) {
        res.status(404).json({ error: 'Users not found' });
      } else {
        res.status(200).json(users);
        console.log('users displayed');
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

module.exports = { getUser, createUser, getAllUsers };

