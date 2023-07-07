import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { DocumentReference, Timestamp } from "firebase/firestore";
import {
  collection,
  query,
  doc,
  getDoc,
  getDocs,
  where,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../libraries/firebase";
import type { ModalStaticFunctions } from "antd/es/modal/confirm";
import { ExclamationCircleOutlined } from "@ant-design/icons";

interface IFetchBoardData {
  uid?: string | undefined;
  writer?: string | undefined;
  title?: string | undefined;
  contents?: string | undefined;
  createdAt?: Timestamp | undefined;
  images?: string[] | undefined;
}

export const useQueryFetchBoard = (
  modal: Omit<ModalStaticFunctions, "warn">
): {
  data: IFetchBoardData | undefined;
  onClickEditBtn: () => void;
  onClickDeleteBtn: () => void;
} => {
  const [data, setData] = useState<IFetchBoardData | undefined>();
  const router = useRouter();

  const getData = async (): Promise<IFetchBoardData | undefined> => {
    const docRef = doc(
      db,
      "Board",
      router.query.boardId as string
    ) as DocumentReference<IFetchBoardData>;
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return docSnap.data();
    return undefined;
  };

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

  useEffect(() => {
    getData()
      .then((board) => {
        const boardData: IFetchBoardData = { ...board };
        boardData.uid = board?.writer;
        if (board?.writer === undefined) return;
        const writerRef = collection(db, "User");
        const q = query(writerRef, where("uid", "==", board.writer));
        getDocs(q)
          .then((users) => {
            let username = "";
            users.forEach((user) => {
              username = user.data().nickname;
            });
            if (username !== "") boardData.writer = username;
            setData(boardData);
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  return {
    data,
    onClickEditBtn,
    onClickDeleteBtn,
  };
};
