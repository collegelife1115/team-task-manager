const Joi = require('joi');

exports.validateSignup = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('admin', 'manager', 'intern'),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ success: false, error: error.details[0].message });
  next();
};

exports.validateProject = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    deadline: Joi.date().required(),
    status: Joi.string().valid('Active', 'Completed', 'On Hold'),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ success: false, error: error.details[0].message });
  next();
};

exports.validateTask = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    dueDate: Joi.date().required(),
    priority: Joi.string().valid('Low', 'Medium', 'High'),
    status: Joi.string().valid('Pending', 'In Progress', 'Review', 'Completed', 'Overdue'),
    project: Joi.string().required(),
    assignee: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ success: false, error: error.details[0].message });
  next();
};
