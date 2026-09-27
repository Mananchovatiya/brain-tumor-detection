import api from "./api";

// These call the backend auth routes we'll build in Step 9.
// For now they'll fail with a network error until the backend exists —
// that's expected, the UI/validation can still be tested.

export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

export const updateProfile = async (profileData) => {
  const response = await api.put("/auth/me", profileData);
  return response.data;
};

export const getMe = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};
