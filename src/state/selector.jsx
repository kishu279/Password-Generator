import { selector } from "recoil";
import { lengthSaver, sparePass } from "./atom";

export const passMaker = selector({
  key: "passMaker",
  get: ({ get }) => {
    let len = get(lengthSaver);
    const spare = get(sparePass);
    let pass = "";

    while (len > 0) {
      pass += spare[Math.floor(Math.random() * spare.length)];
      len -= 1;
    }

    return pass;
  },
});
