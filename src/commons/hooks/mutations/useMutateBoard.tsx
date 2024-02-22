import type { NextRouter } from "next/router";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../libraries/firebase";
import type { BoardDetail } from "../../libraries/firestore";
import type { ShowToastParams } from "../custom/useToast";
import { deleteImage } from "../../apis/mypage";
import useModal from "../custom/useModal";

export const useMutateBoard = (
  router: NextRouter,
  data: BoardDetail,
  showToast: ShowToastParams
): {
  onClickDeleteBtn: VoidFunction;
  open: boolean;
  handleOpen: VoidFunction;
  handleClose: VoidFunction;
} => {
  const { open, handleOpen, handleClose } = useModal();

  const onClickDeleteBtn = async () => {
    try {
      await deleteDoc(doc(db, "Board", router.query.boardId as string));
      if (data.thumbRef !== "") await deleteImage(data.thumbRef);
      showToast("success", "게시물이 삭제 되었습니다.");
      void router.push(`/free`);
    } catch (error) {
      if (error instanceof Error) showToast("error", error.message);
    }
  };

  return {
    onClickDeleteBtn,
    open,
    handleOpen,
    handleClose,
  };
};
