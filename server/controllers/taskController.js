const Task = require('../models/Task');
const Project = require('../models/Project');
const User = require('../models/User');

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
exports.getTasks = async (req, res, next) => {
  try {
    let query;

    if (req.user.role === 'admin') {
      query = Task.find().populate('project assignee creator', 'name email title');
    } else if (req.user.role === 'manager') {
      // Tasks created by manager or in projects managed by them
      const managedProjects = await Project.find({ manager: req.user.id });
      const projectIds = managedProjects.map(p => p._id);
      query = Task.find({ 
        $or: [
          { creator: req.user.id },
          { project: { $in: projectIds } }
        ]
      }).populate('project assignee creator', 'name email title');
    } else {
      // Intern: Only assigned tasks
      query = Task.find({ assignee: req.user.id }).populate('project assignee creator', 'name email title');
    }

    const tasks = await query;

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private (Admin, Manager)
exports.createTask = async (req, res, next) => {
  try {
    req.body.creator = req.user.id;

    // Check if project exists
    const project = await Project.findById(req.body.project);
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    // Check if assignee is an Intern or Manager (Managers can assign to both)
    if (req.user.role === 'manager') {
      const assignee = await User.findById(req.body.assignee);
      if (!assignee || (assignee.role !== 'intern' && assignee.role !== 'manager')) {
        return res.status(400).json({ success: false, error: 'Managers can only assign tasks to Interns or other Managers' });
      }
    }

    const task = await Task.create(req.body);

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Update task status
// @route   PATCH /api/tasks/:id/status
// @access  Private
exports.updateTaskStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }

    // RBAC: Interns can only update status of their assigned tasks
    if (req.user.role === 'intern' && task.assignee.toString() !== req.user.id) {
      return res.status(401).json({ success: false, error: 'Not authorized to update this task status' });
    }

    // RBAC: Limit status transitions for interns if needed (here we allow any valid status for simplicity)
    
    task = await Task.findByIdAndUpdate(req.params.id, { status }, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private (Admin, Manager)
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }

    // Authorization check
    if (req.user.role !== 'admin' && task.creator.toString() !== req.user.id) {
        return res.status(401).json({ success: false, error: 'Not authorized to delete this task' });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
