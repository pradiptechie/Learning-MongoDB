const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTaskById = async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
const createTask = async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const createTasks = async (req, res) => {
    try {
      const tasks = req.body; // Assuming req.body is an array of tasks
  
      // Insert all tasks into the database
      const createdTasks = await Task.create(tasks);
  
      res.status(201).json(createdTasks);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

const updateTask = async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      if (req.body.title != null) {
        task.title = req.body.title;
      }
      if (req.body.description != null) {
        task.description = req.body.description;
      }
      if (req.body.status != null) {
        task.status = req.body.status;
      }
  
      const updatedTask = await task.save();
      res.json(updatedTask);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  

  const deleteTask = async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      await task.deleteOne(); // or task.deleteMany() if applicable
      res.json({ message: 'Task deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  createTasks
};
