const express = require('express');
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(authorize('admin')); // Only Admin can access these routes

router.route('/').get(getUsers).post(createUser);

router.route('/:id').put(updateUser).delete(deleteUser);

module.exports = router;
