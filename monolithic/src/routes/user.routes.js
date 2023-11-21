const { Router } = require('express');
const router = Router();
const {
  /*getUser,
  getUserById,
  createUser,
  deleteUser,
  updateUser,*/
  getUser,
  createUser,
  getAllUsers,
} = require('../controllers/user.controller');

router.post('/', createUser);
router.get('/', getUser);
router.get('/all', getAllUsers);
// router.patch('/:id', updateUser);
// router.delete('/:id', deleteUser);

module.exports = router;
