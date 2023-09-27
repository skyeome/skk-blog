import { useEffect, useState } from "react";
import { useRouter } from "next/router";
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
import { BoardDetailConverter } from "../../libraries/firestore";
import type { BoardDetail } from "../../libraries/firestore";

export const useQueryFetchBoard = (
  modal: Omit<ModalStaticFunctions, "warn">
): {
  data: BoardDetail | undefined;
  isLoaded: boolean;
  onClickEditBtn: () => void;
  onClickDeleteBtn: () => void;
} => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [BoardData, setBoardData] = useState<BoardDetail>();
  const router = useRouter();

  const fetchBoardData = async (): Promise<void> => {
    const docRef = doc(db, "Board", router.query.boardId as string).withConverter(BoardDetailConverter);
    try {
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()) {
        // 게시글 정보 받기
        const boardData: BoardDetail = docSnap.data();
        // writer 가 uid 이면 닉네임 불러오기
        const writerRef = collection(db, "User");
        const q = query(writerRef, where("uid", "==", boardData.writer));
        const querySn = await getDocs(q);
        
        let username = "";
        querySn.forEach((user) => {
          username = user.data().nickname;
        });
        // 닉네임 있으면 작성자 이름을 닉네임으로 변경
        if (username !== "") boardData.writer = username;
        setBoardData(boardData);
      }
    } catch (error) {
      if(error instanceof Error) console.error(error.message);
    } finally {
      setIsLoaded(true);
    }
  }

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
    void fetchBoardData();
  }, []);

  return {
    data: BoardData,
    isLoaded,
    onClickEditBtn,
    onClickDeleteBtn,
  };
};
