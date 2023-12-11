import type { User } from "firebase/auth";
import { atom } from "recoil";
import { v4 as uuidv4 } from "uuid";

export const userState = atom<User | null>({
  key: `userState/${uuidv4()}`,
  default: null,
});
