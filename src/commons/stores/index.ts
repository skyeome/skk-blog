import { atom } from "recoil";
import { v4 as uuidv4 } from "uuid";
import type { FbUser } from "../hooks/custom/useAuthChange";

export const userState = atom<FbUser | null>({
  key: `userState/${uuidv4()}`,
  default: null,
});
