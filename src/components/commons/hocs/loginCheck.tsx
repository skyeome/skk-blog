import { useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { userState } from "../../../commons/stores";
import { db } from "../../../commons/libraries/firebase";
import { doc, getDoc } from "firebase/firestore";

export const loginCheck = (Component: any) => (props: any) => {
  const router = useRouter();
  const [user] = useRecoilState(userState);
  useEffect(() => {
    if (user === null) {
      void router.push("/auth/signin");
    }
  }, [user]);

  return <Component {...props} />;
};

export const userIdCheck = (Component: any) => (props: any) => {
  const router = useRouter();
  const [user] = useRecoilState(userState);
  useEffect(() => {
    // console.log(router.query.boardId);
    const docRef = doc(db, "Board", router.query.boardId as string);
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists() && docSnap.data().writer !== user?.uid)
          void router.push("/");
      })
      .catch((error) => {
        alert(error.message);
      });
    if (user === null) {
      void router.push("/auth/signin");
    }
  }, [user]);

  return <Component {...props} />;
};
