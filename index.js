const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const taskController = require('./controllers/taskController');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/CRUD', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => console.error(err));

// Routes
// Get all tasks
app.get('/tasks', taskController.getAllTasks);

// Get a specific task
app.get('/tasks/:id', taskController.getTaskById);

// Create a task
app.post('/task', taskController.createTask);

// Create many tasks at once
app.post('/tasks', taskController.createTasks);

// Update a task
app.patch('/tasks/:id', taskController.updateTask);

// Delete a task
app.delete('/tasks/:id', taskController.deleteTask);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
