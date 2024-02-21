import type { Dispatch, SetStateAction } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../libraries/firebase";
import bcrypt from "bcryptjs";

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
    try {
      const docSnap = await getDoc(doc(db, "BoardComment", id));
      if (!docSnap.exists()) return;
      const isPasswordCorrect = await bcrypt.compare(
        password,
        docSnap.data().password
      );
      if (isPasswordCorrect) {
        setOpen(false);
        setIsOpenEdit(false);
        setIsEdit(true);
      } else {
        setErrMsg("입력하신 비밀번호가 다릅니다.");
      }
    } catch (error) {
      if (error instanceof Error) setErrMsg(error.message);
    }
  };
  return {
    onClickEdit,
  };
};
