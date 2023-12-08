import { useRecoilState } from "recoil";
import { login, register, updateAvatarUser, updateProfile } from "./api";
import { allResep, userData } from "./recoil";

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

export const useUpdateAvatar = () => {
  return {
    updateAvatar: async (payload) => await updateAvatarUser(payload),
  };
};

export const useUpdateUser = () => {
  return {
    updateUser: async (payload) => await updateProfile(payload),
  };
};

// Recoil
export const useUserData = () => {
  const [get, set] = useRecoilState(userData);
  return {
    setUserData: (val) => set(val),
    getUserData: get,
  };
};

export const useAllResep = () => {
  const [get, set] = useRecoilState(allResep);
  return {
    setAllResep: (val) => set(val),
    getAllResep: get,
  };
};
