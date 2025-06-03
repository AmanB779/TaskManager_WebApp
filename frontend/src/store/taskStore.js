import { create } from "zustand";
import axios from "axios";
import useAuthStore from "./authStore";

const API_URL = import.meta.env.VITE_API_URL;

const useTaskStore = create((set) => ({
  tasks: [],
  loading: false,
  error: null,

  clearError: () => set({ error: null }),

  fetchTasks: async () => {
    set({ loading: true, error: null });
    try {
      const token = useAuthStore.getState().getToken();
      // console.log("Fetching tasks with token:", token);
      const response = await axios.get(`${API_URL}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("Tasks response:", response.data);
      const tasks = response.data.tasks || [];
      // console.log("Processed tasks:", tasks);
      set({ tasks, loading: false });
    } catch (err) {
      console.error("Error fetching tasks:", err);
      set({
        error: err.response?.data?.message || "An error occurred while fetching tasks",
        loading: false,
        tasks: [],
      });
    }
  },

  addTask: async (taskData) => {
    set({ loading: true, error: null });
    try {
      const token = useAuthStore.getState().getToken();
      await axios.post(`${API_URL}/tasks/addTask`, taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Refresh the task list
      const response = await axios.get(`${API_URL}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({
        tasks: response.data.tasks || [],
        loading: false,
      });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to add task",
        loading: false,
      });
    }
  },

  updateTask: async (taskId, updatedData) => {
    set({ loading: true, error: null });
    try {
      const token = useAuthStore.getState().getToken();
      await axios.put(`${API_URL}/tasks/${taskId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Refresh the task list
      const response = await axios.get(`${API_URL}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({
        tasks: response.data.tasks || [],
        loading: false,
      });
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message || "Failed to update task",
        loading: false,
      });
    }
  },

  deleteTask: async (taskId) => {
    set({ loading: true, error: null });
    try {
      const token = useAuthStore.getState().getToken();
      await axios.delete(`${API_URL}/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set((state) => ({
        tasks: state.tasks.filter((task) => task._id !== taskId) || [],
        error: null,
        loading: false,
      }));
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to delete task",
        loading: false,
      });
    }
  },
}));

export default useTaskStore;
