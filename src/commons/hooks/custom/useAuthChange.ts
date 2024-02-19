import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { onAuthStateChanged, signOut } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../../libraries/firebase";
import { userState } from "../../stores";

export default function useAuthChange() {
  const [user, setUser] = useRecoilState<User | null>(userState);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        const userCopy = JSON.parse(JSON.stringify(user));
        setUser(userCopy);
      } else {
        setUser(null);
      }
    });
  }, []);

  const onClickLogout = (): void => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return { user, handleLogout: onClickLogout };
}
