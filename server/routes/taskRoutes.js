const express = require('express');
const {
  getTasks,
  createTask,
  updateTaskStatus,
  deleteTask,
} = require('../controllers/taskController');

const { protect, authorize } = require('../middleware/auth');
const { validateTask } = require('../middleware/validator');

const router = express.Router();

router.use(protect);

router
  .route('/')
  .get(getTasks)
  .post(authorize('admin', 'manager'), validateTask, createTask);

router.patch('/:id/status', updateTaskStatus);

router.delete('/:id', authorize('admin', 'manager'), deleteTask);

module.exports = router;
