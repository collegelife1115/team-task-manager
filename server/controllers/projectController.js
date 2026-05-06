const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Private
exports.getProjects = async (req, res, next) => {
  try {
    let query;

    // If Admin, see all. If Manager, see their own. If Intern, see projects they have tasks in?
    // For simplicity, lets say Interns can view projects too, but RBAC will restrict creation.
    if (req.user.role === 'admin') {
      query = Project.find().populate('manager', 'name email');
    } else if (req.user.role === 'manager') {
      query = Project.find({ manager: req.user.id }).populate('manager', 'name email');
    } else {
      // Interns see all projects for now, or we could filter by assigned tasks
      query = Project.find().populate('manager', 'name email');
    }

    const projects = await query;

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Private
exports.getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).populate('manager', 'name email');

    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private (Admin, Manager)
exports.createProject = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.manager = req.user.id;

    const project = await Project.create(req.body);

    res.status(201).json({
      success: true,
      data: project,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private (Admin, Manager)
exports.updateProject = async (req, res, next) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    // Make sure user is project manager or admin
    if (project.manager.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, error: 'Not authorized to update this project' });
    }

    project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private (Admin, Manager)
exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    // Make sure user is project manager or admin
    if (project.manager.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, error: 'Not authorized to delete this project' });
    }

    await project.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
