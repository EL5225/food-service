import { atom } from "recoil";

export const userData = atom({
  key: "userData",
  default: null,
});

export const avatar = atom({
  key: "avatar",
  default: null,
});

export const sidebarName = atom({
  key: "sidebarName",
  default: null,
});

export const showSidebar = atom({
  key: "showSidebar",
  default: false,
});
