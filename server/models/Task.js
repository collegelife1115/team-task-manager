const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a task title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  dueDate: {
    type: Date,
    required: [true, 'Please add a due date'],
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium',
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Review', 'Completed', 'Overdue'],
    default: 'Pending',
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project',
    required: true,
  },
  assignee: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Task', taskSchema);
