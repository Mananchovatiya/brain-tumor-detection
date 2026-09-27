import api from "./api";

export const getPatients = async () => {
  const response = await api.get("/doctor/patients");
  return response.data;
};

export const getPatientById = async (patientId) => {
  const response = await api.get(`/doctor/patients/${patientId}`);
  return response.data;
};

export const getPatientScans = async (patientId) => {
  const response = await api.get(`/doctor/patients/${patientId}/scans`);
  return response.data;
};
