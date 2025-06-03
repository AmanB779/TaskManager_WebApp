import { useState, useEffect } from "react";
import useTaskStore from "../store/taskStore";

function TaskForm({ taskToEdit = null, onEditComplete = () => {} }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    startDate: "",
    startTime: "",
    dueDate: "",
    dueTime: "",
    status: "pending",
  });
  const { addTask, updateTask } = useTaskStore();

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        console.log("Invalid date:", dateString);
        return "";
      }
      return date.toISOString().split("T")[0];
    } catch {
      console.error("Error formatting date", dateString);
      return "";
    }
  };

  const formatTimeForInput = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        console.log("Invalid time", dateString);
        return "";
      }
      return date.toTimeString().slice(0, 5);
    } catch {
      console.error("Error formatting time", dateString);
      return "";
    }
  };

  useEffect(() => {
    if (taskToEdit) {
      // console.log("Setting form data for edit:", taskToEdit);
      setFormData({
        title: taskToEdit.title || "",
        description: taskToEdit.description || "",
        priority: taskToEdit.priority || "medium",
        startDate: formatDateForInput(taskToEdit.startDateTime || taskToEdit.startDate),
        startTime: formatTimeForInput(taskToEdit.startDateTime || taskToEdit.startDate),
        dueDate: formatDateForInput(taskToEdit.dueDateTime || taskToEdit.dueDate),
        dueTime: formatTimeForInput(taskToEdit.dueDateTime || taskToEdit.dueDate),
        status: taskToEdit.status || "pending",
      });
    }
  }, [taskToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Form submitted with data:", formData);
    if (!formData.startDate || !formData.startTime || !formData.dueDate || !formData.dueTime) {
      console.error("Missing date or time");
      return;
    }
    const taskData = {
      ...formData,
      startDate: new Date(`${formData.startDate}T${formData.startTime}:00`).toISOString(),
      dueDate: new Date(`${formData.dueDate}T${formData.dueTime}:00`).toISOString(),
      updatedAt: new Date().toISOString(),
    };
    delete taskData.startTime;
    delete taskData.dueTime;
    // console.log("Submitting task data:", taskData);
    if (taskToEdit) {
      await updateTask(taskToEdit._id, taskData);
      onEditComplete();
    } else {
      taskData.createdAt = new Date().toISOString();
      await addTask(taskData);
    }

    if (!taskToEdit) {
      setFormData({
        title: "",
        description: "",
        priority: "medium",
        startDate: "",
        startTime: "",
        dueDate: "",
        dueTime: "",
        status: "pending",
      });
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h3 className="card-title mb-4">{taskToEdit ? "Edit Task" : "Add New Task"}</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} rows="3" required />
          </div>
          <div className="mb-3">
            <label htmlFor="priority" className="form-label">
              Priority
            </label>
            <select className="form-select" id="priority" name="priority" value={formData.priority} onChange={handleChange} required>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select className="form-select" id="status" name="status" value={formData.status} onChange={handleChange} required>
              <option value="pending">Pending</option>
              <option value="started">Started</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="startDate" className="form-label">
                Start Date
              </label>
              <input type="date" className="form-control" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label htmlFor="startTime" className="form-label">
                Start Time
              </label>
              <input type="time" className="form-control" id="startTime" name="startTime" value={formData.startTime} onChange={handleChange} required />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="dueDate" className="form-label">
                Due Date
              </label>
              <input type="date" className="form-control" id="dueDate" name="dueDate" value={formData.dueDate} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label htmlFor="dueTime" className="form-label">
                Due Time
              </label>
              <input type="time" className="form-control" id="dueTime" name="dueTime" value={formData.dueTime} onChange={handleChange} required />
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            {taskToEdit ? "Update Task" : "Add Task"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;
