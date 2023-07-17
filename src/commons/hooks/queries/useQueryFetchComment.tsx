import type { Timestamp } from "firebase/firestore";
import {
  collection,
  // getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../libraries/firebase";

export interface IBoardCommentData {
  id: string;
  boardId: string;
  writer: string;
  contents: string;
  star: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface IUseFetchCommentArgs {
  boardId: string;
}

export const useQueryFetchComment = (
  args: IUseFetchCommentArgs
): { data: IBoardCommentData[] | undefined } => {
  const [data, setData] = useState<IBoardCommentData[]>();
  const docRef = collection(db, "BoardComment");
  const q = query(
    docRef,
    where("boardId", "==", args.boardId),
    orderBy("createdAt")
  );
  // const getCommentData = async (): Promise<void> => {
  //   const CommentData: IBoardCommentData[] = [];
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     const docData = doc.data() as IBoardCommentData;
  //     CommentData.push({ ...docData, id: doc.id });
  //   });
  //   setData(CommentData);
  //   console.log("데이터 받아옴");
  // };

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (snapshot) => {
      // console.log("데이터 받아옴");
      const comments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<IBoardCommentData, "id">),
      }));
      setData(comments);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return {
    data,
  };
};
