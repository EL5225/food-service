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

export const updateProfile = async (payload) => {
  const { data } = await api.patch("/user", payload);
  return data;
};

export const updateAvatarUser = async (payload) => {
  const formData = new FormData();
  formData.append("image_url", payload);
  const { data } = await api.put("/user/avatar", formData);
  return data;
};

export const getAllResepPagination = async (params) => {
  const { data } = await api.get("/resep", {
    params,
  });
  return data;
};
