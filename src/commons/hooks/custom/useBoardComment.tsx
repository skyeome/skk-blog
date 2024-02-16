import type { SyntheticEvent } from "react";
import type { FormState, UseFormReset, UseFormSetValue } from "react-hook-form";
import { db } from "../../libraries/firebase";
import {
  collection,
  serverTimestamp,
  addDoc,
  updateDoc,
  doc,
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
  refetch?: () => void;
}

export const useBoardComment = (
  args: IUseBoardCommentArgs
): Record<any, any> => {
  const onClickWrite = async (data: ICommentValues): Promise<void> => {
    try {
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
    if (args.refetch !== undefined) args.refetch();
  };

  const onClickUpdate = async (data: ICommentValues): Promise<void> => {
    try {
      const updatedData: Partial<ICommentValues> = {};
      if (data.writer !== undefined) updatedData.writer = data.writer;
      if (data.password !== undefined) updatedData.password = data.password;
      if (data.contents !== undefined) updatedData.contents = data.contents;
      if (data.star !== undefined) updatedData.star = data.star;
      if (args.commentId === undefined || args.onClickSubmit === undefined)
        return;

      await updateDoc(doc(db, "BoardComment", args.commentId), {
        ...updatedData,
        updatedAt: serverTimestamp(),
      });
      args.onClickSubmit();
      if (args.refetch !== undefined) args.refetch();
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  const setRating = (
    event: SyntheticEvent<Element, Event>,
    value: number | null
  ) => {
    args.setValue("star", value ?? 0);
  };
  return {
    onClickWrite,
    onClickUpdate,
    setRating,
  };
};
