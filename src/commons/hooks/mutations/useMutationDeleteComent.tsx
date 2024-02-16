import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../libraries/firebase";
import type { Dispatch, SetStateAction } from "react";

export const useMutationDeleteComment = (
  id: string,
  password: string,
  setErrMsg: Dispatch<SetStateAction<string>>,
  setOpen: Dispatch<SetStateAction<boolean>>,
  setIsOpenEdit: Dispatch<SetStateAction<boolean>>
): {
  onClickDelete: () => Promise<void>;
} => {
  const onClickDelete = async (): Promise<void> => {
    getDoc(doc(db, "BoardComment", id))
      .then((docSnap) => {
        if (!docSnap.exists()) return;
        if (docSnap.data().password === password) {
          deleteDoc(doc(db, "BoardComment", id))
            .then(() => {
              setOpen(false);
              setIsOpenEdit(false);
            })
            .catch((error) => {
              console.log(error.message);
            });
        } else {
          setErrMsg("입력하신 비밀번호가 다릅니다.");
        }
      })
      .catch((error) => {
        setErrMsg(error.message);
      });
  };
  return {
    onClickDelete,
  };
};
