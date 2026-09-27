import api from "./api";

export const uploadScan = async (file) => {
  const formData = new FormData();
  formData.append("mriImage", file);

  const response = await api.post("/scans/upload", formData);
  return response.data;
};

export const analyzeScan = async (scanId) => {
  const response = await api.post(`/scans/${scanId}/analyze`);
  return response.data;
};

export const getScanResult = async (scanId) => {
  const response = await api.get(`/scans/${scanId}/result`);
  return response.data;
};

export const getScans = async () => {
  const response = await api.get("/scans");
  return response.data;
};
