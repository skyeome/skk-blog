import type { FormState, UseFormReset, UseFormSetValue } from "react-hook-form";
import { db } from "../../libraries/firebase";
import {
  collection,
  serverTimestamp,
  addDoc,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";

export interface ICommentValues {
  writer: string;
  password: string;
  contents: string;
  star: number;
}

interface IUseBoardCommentArgs {
  boardId: string;
  commentId?: string | undefined;
  formState: FormState<ICommentValues>;
  setValue: UseFormSetValue<ICommentValues>;
  reset: UseFormReset<ICommentValues>;
  onClickSubmit?: () => void;
}

export const useBoardComment = (
  args: IUseBoardCommentArgs
): Record<any, any> => {
  const onClickWrite = async (data: ICommentValues): Promise<void> => {
    try {
      // TODO: 댓글작성 로직구현

      await addDoc(collection(db, "BoardComment"), {
        boardId: args.boardId,
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
    args.reset({
      writer: "",
      password: "",
      contents: "",
      star: 0,
    });
  };

  const onClickUpdate = async (data: ICommentValues): Promise<void> => {
    try {
      if (args.commentId === undefined || args.onClickSubmit === undefined)
        return;
      if (data.password === undefined) {
        alert("비밀번호를 입력해주세요");
        return;
      }
      const result = await getDoc(doc(db, "BoardComment", args.commentId));
      if (result.exists()) {
        const resultData = result.data();
        if (resultData.password !== data.password) {
          alert("비밀번호가 다릅니다.");
          return;
        }
      }
      await updateDoc(doc(db, "BoardComment", args.commentId), {
        ...data,
        updatedAt: serverTimestamp(),
      });
      args.onClickSubmit();
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  const setRating = (rating: number): void => {
    args.setValue("star", rating);
  };
  return {
    onClickWrite,
    onClickUpdate,
    setRating,
  };
};
