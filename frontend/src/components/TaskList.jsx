import { useState } from "react";
import useTaskStore from "../store/taskStore";
import TaskForm from "./TaskForm";

function TaskList({ tasks = [] }) {
  const { updateTask, deleteTask } = useTaskStore();
  const [editingTask, setEditingTask] = useState(null);

  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        console.log("Invalid date string:", dateString);
        return "Invalid Date";
      }
      return date.toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      console.log("Error formatting date:", dateString);
      return "Invalid Date";
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTask(taskId, { status: newStatus });
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleDelete = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await deleteTask(taskId);
    }
  };

  const handleEdit = (task) => {
    const editTask = {
      ...task,
      startDateTime: task.startDate,
      dueDateTime: task.dueDate,
    };
    // console.log("Editing task:", editTask);
    setEditingTask(editTask);
  };

  const handleEditComplete = () => {
    setEditingTask(null);
  };

  if (!Array.isArray(tasks)) {
    return (
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="alert alert-warning" role="alert">
            Unable to load tasks. Please try refreshing the page.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h3 className="card-title mb-4">Your Tasks</h3>

        {editingTask ? (
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="mb-0">Editing Task</h4>
              <button onClick={handleEditComplete} className="btn btn-outline-secondary btn-sm">
                Cancel Edit
              </button>
            </div>
            <TaskForm taskToEdit={editingTask} onEditComplete={handleEditComplete} />
          </div>
        ) : (
          <>
            {tasks.length === 0 ? (
              <p className="text-muted text-center">No tasks found. Create first task!</p>
            ) : (
              <div className="list-group">
                {tasks.map((task) => {
                  // console.log("Task data:", task);
                  return (
                    <div key={task._id} className="list-group-item">
                      <div className="d-flex align-items-start justify-content-between">
                        <div className="flex-grow-1">
                          <div className="d-flex align-items-start justify-content-between mb-2">
                            <h5 className="mb-1">{task.title}</h5>
                            <span
                              className={`badge bg-${
                                task.priority === "urgent" ? "danger" : task.priority === "high" ? "danger" : task.priority === "medium" ? "warning" : "info"
                              }`}
                            >
                              {task.priority}
                            </span>
                          </div>
                          <p className="mb-2 text-muted">{task.description}</p>
                          <div className="d-flex flex-wrap gap-3 mb-2">
                            <div>
                              <small className="text-muted d-block">Start:</small>
                              <small>{formatDate(task.startDate)}</small>
                            </div>
                            <div>
                              <small className="text-muted d-block">Due:</small>
                              <small>{formatDate(task.dueDate)}</small>
                            </div>
                            {task.updatedAt && task.updatedAt !== task.createdAt && (
                              <div>
                                <small className="text-muted d-block">Updated:</small>
                                <small>{formatDate(task.updatedAt)}</small>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="d-flex flex-column gap-2 ms-3">
                          <select className="form-select form-select-sm" value={task.status} onChange={(e) => handleStatusChange(task._id, e.target.value)}>
                            <option value="pending">Pending</option>
                            <option value="started">Started</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="archived">Archived</option>
                          </select>
                          <div className="d-flex gap-2">
                            <button onClick={() => handleEdit(task)} className="btn btn-sm btn-outline-primary">
                              Edit
                            </button>
                            <button onClick={() => handleDelete(task._id)} className="btn btn-sm btn-outline-danger">
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default TaskList;
