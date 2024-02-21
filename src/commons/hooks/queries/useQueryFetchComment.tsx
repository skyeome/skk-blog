import { useQuery } from "react-query";
import type { Timestamp } from "firebase/firestore";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../libraries/firebase";

export interface BoardCommentData {
  id: string;
  boardId: string;
  writer: string;
  contents: string;
  star: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const useQueryFetchComment = (boardId: string) => {
  const docRef = collection(db, "BoardComment");
  const q = query(
    docRef,
    where("boardId", "==", boardId),
    orderBy("createdAt")
  );

  const getCommentData = async (): Promise<BoardCommentData[]> => {
    const CommentData: BoardCommentData[] = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const docData = doc.data() as BoardCommentData;
      CommentData.push({ ...docData, id: doc.id });
    });
    return CommentData;
  };
  const { data, isLoading, refetch } = useQuery(["comments"], getCommentData);

  return { data, isLoading, refetch };
};
