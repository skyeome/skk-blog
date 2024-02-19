import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../libraries/firebase";
import { userState } from "../../stores";

export interface FbUser {
  uid?: string;
  displayName?: string | null;
  email?: string | null;
  photoURL?: string | null;
}

export default function useAuthChange() {
  const [user, setUser] = useRecoilState(userState);
  useEffect(() => {
    const userJSON = localStorage.getItem("user");
    if (userJSON !== null) {
      setUser(JSON.parse(userJSON));
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        const userCopy: FbUser = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };
        setUser(userCopy);
        localStorage.setItem("user", JSON.stringify(userCopy));
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
    });
    return () => {
      unsubscribe();
    };
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
