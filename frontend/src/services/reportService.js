import api from "./api";

export const saveReport = async (scanId, reportData) => {
  const response = await api.post(`/reports/${scanId}`, reportData);
  return response.data;
};

export const getReport = async (scanId) => {
  const response = await api.get(`/reports/${scanId}`);
  return response.data;
};

export const getMyReports = async () => {
  const response = await api.get("/reports");
  return response.data;
};
