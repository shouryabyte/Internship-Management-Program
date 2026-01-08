import api from "./axios";

export const checkHealth = async () => {
  const res = await api.get("/api/health");
  return res.data;
};
