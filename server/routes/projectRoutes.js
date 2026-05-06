const express = require('express');
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');

const { protect, authorize } = require('../middleware/auth');
const { validateProject } = require('../middleware/validator');

const router = express.Router();

router.use(protect);

router
  .route('/')
  .get(getProjects)
  .post(authorize('admin', 'manager'), validateProject, createProject);

router
  .route('/:id')
  .get(getProject)
  .put(authorize('admin', 'manager'), validateProject, updateProject)
  .delete(authorize('admin', 'manager'), deleteProject);

module.exports = router;
