import { useRecoilState } from "recoil";
import {
  createReviews,
  login,
  register,
  saveResep,
  updateAvatarUser,
  updateProfile,
} from "./api";
import { avatar, showSidebar, sidebarName, userData } from "./recoil";

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

export const useCreateReviews = () => {
  return {
    createReviews: async (id, payload) => await createReviews(payload, id),
  };
};

export const useSaveResep = () => {
  return {
    saveResep: async (payload) => await saveResep(payload),
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

export const useAvatar = () => {
  const [get, set] = useRecoilState(avatar);
  return {
    setGlobalAvatar: (val) => set(val),
    getGlobalAvatar: get,
  };
};

export const useSidebarName = () => {
  const [get, set] = useRecoilState(sidebarName);
  return {
    setSidebarName: (val) => set(val),
    getSidebarName: get,
  };
};

export const useShowSidebar = () => {
  const [get, set] = useRecoilState(showSidebar);
  return {
    setShowSidebar: (val) => set(val),
    getShowSidebar: get,
  };
};
