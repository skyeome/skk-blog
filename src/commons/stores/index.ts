import { atom } from "recoil";
import { v4 as uuidv4 } from "uuid";

export interface UserSimple {
  uid?: string;
  email?: string | null;
  photoURL?: string | null;
}

export const userState = atom<UserSimple | null>({
  key: `userState/${uuidv4()}`,
  default: null,
});
