import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const useAuthStore = create((set) => ({
  userName: localStorage.getItem("userName") || null,
  apiToken: localStorage.getItem("apiToken") || null,
  isAuthenticated: localStorage.getItem("apiToken") ? true : false,
  error: null,

  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      const { user, apiToken } = response.data;
      console.log("Login successful:", user);
      if (!apiToken) {
        throw new Error("No token received from server");
      }
      localStorage.setItem("apiToken", apiToken);
      localStorage.setItem("userName", user);
      set({ userName: user, apiToken, isAuthenticated: true, error: null });
      return { user, apiToken };
    } catch (err) {
      const error = err.response?.data?.message || "An error occurred during login";
      set({ error });
      throw new Error(error);
    }
  },

  register: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      const { user, apiToken } = response.data;
      localStorage.setItem("apiToken", apiToken);
      localStorage.setItem("userName", user);
      set({ userName: user, apiToken, isAuthenticated: true, error: null });
      return { user, apiToken };
    } catch (err) {
      const error = err.response?.data?.message || "An error occurred during registration";
      set({ error });
      throw new Error(error);
    }
  },

  logout: () => {
    localStorage.removeItem("apiToken");
    localStorage.removeItem("userName");
    set({ userName: null, apiToken: null, isAuthenticated: false, error: null });
  },

  getToken: () => {
    const token = localStorage.getItem("apiToken");
    if (!token) {
      throw new Error("No authentication token found");
    }
    return token;
  },
}));

export default useAuthStore;
