import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import useTaskStore from "../store/taskStore";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

function Dashboard() {
  const navigate = useNavigate();
  const { userName, apiToken, logout } = useAuthStore();
  const { tasks = [], loading, error, fetchTasks, clearError } = useTaskStore();

  useEffect(() => {
    if (!apiToken) {
      navigate("/login");
      return;
    }
    // console.log("Dashboard fetching tasks to load data initially");
    fetchTasks();
  }, [apiToken, navigate, fetchTasks]);

  useEffect(() => {
    // console.log("Tasks states updated");
  }, [tasks, loading, error]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2 mb-1">Welcome, {userName}</h1>
        </div>
        <button onClick={handleLogout} className="btn btn-outline-danger">
          Logout
        </button>
      </div>

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" onClick={clearError} aria-label="Close"></button>
        </div>
      )}

      <div className="row">
        <div className="col-lg-4 mb-4">
          <TaskForm />
        </div>
        <div className="col-lg-8">
          <TaskList tasks={Array.isArray(tasks) ? tasks : []} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
