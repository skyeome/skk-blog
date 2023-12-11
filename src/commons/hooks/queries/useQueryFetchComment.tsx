import { useQuery } from "react-query";
import type { Timestamp } from "firebase/firestore";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
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

export const useQueryFetchComment = (
  boardId: string
) => {
  const docRef = collection(db, "BoardComment");
  const q = query(
    docRef,
    where("boardId", "==", boardId),
    orderBy("createdAt")
  );

  // realtime database 예제
  // useEffect(() => {
  //   const unsubscribe = onSnapshot(q, (snapshot) => {
  //     // console.log("데이터 받아옴");
  //     const comments = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...(doc.data() as Omit<IBoardCommentData, "id">),
  //     }));
  //     setData(comments);
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  const getCommentData = async (): Promise<IBoardCommentData[]> => {
    const CommentData: IBoardCommentData[] = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const docData = doc.data() as IBoardCommentData;
      CommentData.push({ ...docData, id: doc.id });
    });
    return CommentData;
  }
  const { data, isLoading, refetch } = useQuery(["comments"], getCommentData);

  return { data, isLoading, refetch };
};
