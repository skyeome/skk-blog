import type { UseFormSetValue } from "react-hook-form";
import { db } from "../../libraries/firebase";
import { collection, serverTimestamp, addDoc } from "firebase/firestore";

export interface ICommentValues {
  writer: string;
  password: string;
  contents: string;
  star: number;
}

interface IUseBoardCommentArgs {
  boardId: string;
  setValue: UseFormSetValue<ICommentValues>;
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
  };

  const setRating = (rating: number): void => {
    args.setValue("star", rating);
  };
  return {
    onClickWrite,
    setRating,
  };
};
