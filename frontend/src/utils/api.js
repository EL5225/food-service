import { api } from "../services/axios";

export const register = async (payload) => {
  const { data } = await api.post("/register", payload);
  return data;
};

export const login = async (payload) => {
  const { data } = await api.post("/login", payload);
  return data;
};

export const getUserMe = async () => {
  const { data } = await api.get("/me");
  return data;
};
