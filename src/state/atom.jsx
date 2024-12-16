import { atom } from "recoil";

export const lengthSaver = atom({
  key: "lengthSaver",
  default: 10,
});

export const sparePass = atom({
  key: "sparePass",
  default: "abcdefghijklmnopqrstuvxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
});
