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
import type { BoardRatest } from "../../../components/units/index/ratest/IndexRatestList.types";
import { BoardConverter } from "../../libraries/firestore";

interface IFetchBoardsList {
  posts: BoardRatest[];
  lastKey: string;
}

export const useQueryFetchBoards = async (
  limits: number = 6
): Promise<IFetchBoardsList> => {
  try {
    const q = query(
      collection(db, "Board"),
      orderBy("createdAt", "desc"),
      limit(limits)
    ).withConverter(BoardConverter);
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs;
    const posts: BoardRatest[] = [];
    let lastKey: Timestamp | string = "";
    data.forEach((doc) => {
      posts.push({
        id: doc.id,
        ...doc.data(),
      });
      lastKey = doc.data().createdAt;
    });
    return { posts, lastKey };
  } catch (error) {
    if (error instanceof Error) alert(error.message);
    return {
      posts: [
        {
          id: "",
          writer: "",
          title: "",
          summary: "",
          createdAt: new Timestamp(0, 0),
          category: [""],
          thumb: "",
        },
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
    ).withConverter(BoardConverter);
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs;
    const posts: BoardRatest[] = [];
    let lastKey: Timestamp | string = "";
    data.forEach((doc) => {
      posts.push({
        id: doc.id,
        ...doc.data(),
      });
      lastKey = doc.data().createdAt;
    });
    return { posts, lastKey };
  } catch (error) {
    if (error instanceof Error) alert(error.message);
    return {
      posts: [
        {
          id: "",
          writer: "",
          title: "",
          summary: "",
          createdAt: new Timestamp(0, 0),
          category: [""],
          thumb: "",
        },
      ],
      lastKey: "",
    };
  }
};
