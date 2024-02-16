import type { NextRouter } from "next/router";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../libraries/firebase";
import { useState } from "react";

export const useMutateBoard = (
  router: NextRouter
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

  const onClickDeleteBtn = (): void => {
    deleteDoc(doc(db, "Board", router.query.boardId as string))
      .then((res) => {
        void router.push(`/free`);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return {
    onClickEditBtn,
    onClickDeleteBtn,
    open,
    handleClickOpen,
    handleClose,
  };
};
