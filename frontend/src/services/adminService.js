import api from "./api";

export const getStats = async () => {
  const response = await api.get("/admin/stats");
  return response.data;
};

export const getUsers = async (role) => {
  const response = await api.get("/admin/users", { params: role ? { role } : {} });
  return response.data;
};

export const createUser = async (userData) => {
  const response = await api.post("/admin/users", userData);
  return response.data;
};

export const toggleUserActive = async (userId) => {
  const response = await api.put(`/admin/users/${userId}/toggle-active`);
  return response.data;
};
