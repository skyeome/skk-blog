import { doc, getDoc } from "firebase/firestore";
import { db } from "../../libraries/firebase";
import type { Dispatch, SetStateAction } from "react";

export const useMutationUpdateComment = (
  id: string,
  password: string,
  setIsEdit: Dispatch<SetStateAction<boolean>>,
  setErrMsg: Dispatch<SetStateAction<string>>,
  setOpen: Dispatch<SetStateAction<boolean>>,
  setIsOpenEdit: Dispatch<SetStateAction<boolean>>
): {
  onClickEdit: () => Promise<void>;
} => {
  const onClickEdit = async (): Promise<void> => {
    getDoc(doc(db, "BoardComment", id))
      .then((docSnap) => {
        if (!docSnap.exists()) return;
        if (docSnap.data().password === password) {
          setOpen(false);
          setIsOpenEdit(false);
          setIsEdit(true);
        } else {
          setErrMsg("입력하신 비밀번호가 다릅니다.");
        }
      })
      .catch((error) => {
        setErrMsg(error.message);
      });
  };
  return {
    onClickEdit,
  };
};
