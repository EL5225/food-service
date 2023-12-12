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
  const { data } = await api.put("/user", payload);
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

export const getResepById = async (id) => {
  const { data } = await api.get(`/resep/${id}`);
  return data;
};

export const createReviews = async (payload, id) => {
  const { data } = await api.post(`/user/rating/${id}`, payload);
  return data;
};

export const saveResep = async (payload) => {
  const { data } = await api.post("/user/save/resep", payload);
  return data;
};

export const getAllSavedResep = async (params) => {
  const { data } = await api.get("/user/resep", {
    params,
  });
  return data;
};

export const createResep = async (payload) => {
  const { data } = await api.post("/resep", payload);
  return data;
};

export const uploadImageResep = async (payload) => {
  const formData = new FormData();
  formData.append("resepId", payload?.resepId);
  formData.append("image_url", payload?.image_url);
  const { data } = await api.post("/resep-image", formData);
  return data;
};

export const getCategory = async () => {
  const { data } = await api.get("/category");
  return data;
};

export const deleteResep = async (id) => {
  const { data } = await api.delete(`/resep/${id}`);
  return data;
};

export const deleteResepImage = async (resep_id, image_id) => {
  const { data } = await api.delete(`/resep/${resep_id}/image/${image_id}`);
  return data;
};

export const updateResep = async (id, payload) => {
  const { data } = await api.patch(`/resep/${id}`, payload);
  return data;
};

export const sendOTP = async (payload) => {
  const { data } = await api.post("/resend", payload);
  return data;
};

export const verifyOTP = async (payload) => {
  const { data } = await api.post("/verify", payload);
  return data;
};
