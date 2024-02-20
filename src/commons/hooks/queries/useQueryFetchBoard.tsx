import { useState } from "react";
import type { NextRouter } from "next/router";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../libraries/firebase";
import type { BoardDetail } from "../../libraries/firestore";
import type { ShowToastParams } from "../custom/useToast";
import { deleteImage } from "../../apis/mypage";

export const useMutateBoard = (
  router: NextRouter,
  data: BoardDetail,
  showToast: ShowToastParams
): {
  onClickEditBtn: VoidFunction;
  onClickDeleteBtn: VoidFunction;
  open: boolean;
  handleClickOpen: VoidFunction;
  handleClose: VoidFunction;
} => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onClickEditBtn = (): void => {
    void router.push(`/free/${router.query.boardId as string}/edit`);
  };

  const onClickDeleteBtn = async () => {
    try {
      await deleteDoc(doc(db, "Board", router.query.boardId as string));
      await deleteImage(data.thumbRef);
      showToast("success", "게시물이 삭제 되었습니다.");
      void router.push(`/free`);
    } catch (error) {
      if (error instanceof Error) showToast("error", error.message);
    }
  };

  return {
    onClickEditBtn,
    onClickDeleteBtn,
    open,
    handleClickOpen,
    handleClose,
  };
};
