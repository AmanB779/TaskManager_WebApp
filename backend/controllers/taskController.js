import Task from "../models/task.js";

// Create a new task
const addTask = async (req, res) => {
  const { title, description, startDate, dueDate, priority, status } = req.body;
  const { userId } = req.user.userId;
  // console.log("Adding task for user:", userId);
  try {
    const newTask = new Task({ title, description, startDate, dueDate, priority, status, user: userId });
    // console.log("New task details:", newTask);
    await newTask.save();
    res.status(201).json({ error: false, message: "Task added" });
  } catch (error) {
    // console.error("Error creating task:", error);
    res.status(500).json({ error: true, message: "Error creating task" });
  }
};

// Get all tasks
const getTasks = async (req, res) => {
  const { userId } = req.user.userId;
  try {
    const tasks = await Task.find({ user: userId }).select("title description startDate dueDate priority status");
    res.status(200).json({ error: false, tasks });
  } catch (error) {
    res.status(500).json({ error: true, message: "Error fetching tasks" });
  }
};

// Update a task by ID
const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description, startDate, dueDate, priority, status } = req.body;
  const { userId } = req.user.userId;
  try {
    const task = await Task.findOne({ _id: taskId, user: userId });
    if (!task) {
      return res.status(404).json({ error: true, message: "Task not found" });
    }
    // Update provided feilds only
    task.title = title || task.title;
    task.description = description || task.description;
    task.startDate = startDate || task.startDate;
    task.dueDate = dueDate || task.dueDate;
    task.priority = priority || task.priority;
    task.status = status || task.status;
    await task.save();
    res.status(200).json({ error: false, message: "Task updated" });
  } catch (error) {
    res.status(500).json({ error: true, message: "Error updating task" });
  }
};

// Delete a task by ID
const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  const { userId } = req.user.userId;
  try {
    const task = await Task.findOneAndDelete({ _id: taskId, user: userId });
    if (!task) {
      return res.status(404).json({ error: true, message: "Task not found" });
    }
    res.status(200).json({ error: false, message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: true, message: "Error deleting task" });
  }
};

export { addTask, getTasks, updateTask, deleteTask };
