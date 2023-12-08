import { atom } from "recoil";

export const userData = atom({
  key: "userData",
  default: null,
});

export const allResep = atom({
  key: "allResep",
  default: [{}],
});
