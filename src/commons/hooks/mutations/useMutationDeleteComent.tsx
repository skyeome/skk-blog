import type { Dispatch, SetStateAction } from "react";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../libraries/firebase";
import bcrypt from "bcryptjs";

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
    try {
      const docSnap = await getDoc(doc(db, "BoardComment", id));
      if (!docSnap.exists()) return;
      const isPasswordCorrect = await bcrypt.compare(
        password,
        docSnap.data().password
      );
      if (isPasswordCorrect) {
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
    } catch (error) {
      if (error instanceof Error) setErrMsg(error.message);
    }
  };
  return {
    onClickDelete,
  };
};
