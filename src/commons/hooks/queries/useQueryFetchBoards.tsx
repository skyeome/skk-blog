import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../libraries/firebase";

interface IFetchBoardsList {
  posts: IBoardList[];
  lastKey: string;
}

export interface IBoardList {
  id: string;
  title: string;
  createdAt: Timestamp;
  images: string[];
}

export const useQueryFetchBoards = async (
  limits: number = 4
): Promise<IFetchBoardsList> => {
  try {
    const q = query(
      collection(db, "Board"),
      orderBy("createdAt", "desc"),
      limit(limits)
    );
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs;
    const posts: IBoardList[] = [];
    let lastKey: string = "";
    data.forEach((doc) => {
      posts.push({
        id: doc.id,
        title: doc.data().title,
        createdAt: doc.data().createdAt,
        images: doc.data().images,
      });
      lastKey = doc.data().createdAt;
    });
    return { posts, lastKey };
  } catch (error) {
    if (error instanceof Error) alert(error.message);
    return {
      posts: [
        { id: "", title: "", createdAt: new Timestamp(0, 0), images: [] },
      ],
      lastKey: "",
    };
  }
};
export const useQueryFetchMoreBoards = async (
  key: any,
  limits: number = 4
): Promise<IFetchBoardsList> => {
  try {
    const q = query(
      collection(db, "Board"),
      orderBy("createdAt", "desc"),
      startAfter(key),
      limit(limits)
    );
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs;
    const posts: IBoardList[] = [];
    let lastKey: string = "";
    data.forEach((doc) => {
      posts.push({
        id: doc.id,
        title: doc.data().title,
        createdAt: doc.data().createdAt,
        images: doc.data().images,
      });
      lastKey = doc.data().createdAt;
    });
    return { posts, lastKey };
  } catch (error) {
    if (error instanceof Error) alert(error.message);
    return {
      posts: [
        { id: "", title: "", createdAt: new Timestamp(0, 0), images: [] },
      ],
      lastKey: "",
    };
  }
};
