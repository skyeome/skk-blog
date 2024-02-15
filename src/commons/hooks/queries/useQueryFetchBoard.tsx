import type { NextRouter } from "next/router";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../libraries/firebase";
import type { ModalStaticFunctions } from "antd/es/modal/confirm";
import { ExclamationCircleOutlined } from "@ant-design/icons";

export const useMutateBoard = (
  modal: Omit<ModalStaticFunctions, "warn">,
  router: NextRouter
): {
  onClickEditBtn: () => void;
  onClickDeleteBtn: () => void;
} => {
  const onClickEditBtn = (): void => {
    void router.push(`/free/${router.query.boardId as string}/edit`);
  };

  const onClickDeleteBtn = (): void => {
    modal.confirm({
      title: "게시글 삭제",
      icon: <ExclamationCircleOutlined rev={undefined} />,
      content:
        "게시글을 삭제하시겠습니까? 삭제한 게시글은 복구가 불가능합니다.",
      okText: "삭제",
      cancelText: "취소",
      onOk: () => {
        deleteDoc(doc(db, "Board", router.query.boardId as string))
          .then((res) => {
            void router.push(`/free`);
          })
          .catch((error) => {
            alert(error.message);
          });
      },
    });
  };

  return {
    onClickEditBtn,
    onClickDeleteBtn,
  };
};
