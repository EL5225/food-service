import { Navigate } from "react-router-dom";
import { getToken, removeToken } from "../../utils";
import { jwtDecode } from "jwt-decode";

export const Protected = ({ children }) => {
  const token = getToken();

  if (!token) {
    return <Navigate to="/login" />;
  }

  const decoded = jwtDecode(token);

  if (Date.now() > decoded.exp * 1000) {
    removeToken();
    return <Navigate to="/login" />;
  }
  return children;
};

export const UnProtected = ({ children }) => {
  const token = getToken();

  if (token) {
    const decoded = jwtDecode(token);
    if (Date.now() > decoded.exp * 1000) {
      removeToken();
      return children;
    }
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export const AdminProtected = ({ children }) => {
  const token = getToken();

  if (token) {
    const decoded = jwtDecode(token);
    if (decoded.role !== "admin") {
      return <Navigate to="/dashboard" />;
    }
    return children;
  }

  return <Navigate to="/login" />;
};
