import { login, register } from "./api";

export const useRegister = () => {
  return {
    register: async (payload) => await register(payload),
  };
};

export const useLogin = () => {
  return {
    login: async (payload) => await login(payload),
  };
};
