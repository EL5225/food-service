import { jwtDecode } from "jwt-decode";

export const getToken = () => {
  if (!localStorage.getItem("token")) {
    return null;
  }
  return localStorage.getItem("token");
};

export const setToken = (token) => {
  if (!token) {
    return null;
  }
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  if (!localStorage.getItem("token")) {
    return null;
  }
  localStorage.removeItem("token");
};

export const getUserRole = () => {
  const token = getToken();
  if (!token) {
    return null;
  }
  const decoded = jwtDecode(token);
  return decoded.role;
};
