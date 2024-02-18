import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import type { BoardRatest } from "../../components/units/index/ratest/IndexRatestList.types";
import { db } from "../libraries/firebase";
import { BoardConverter, UserInfoConverter } from "../libraries/firestore";

export const getMyInfo = async (writer: string) => {
  const writerRef = doc(db, "User", writer).withConverter(UserInfoConverter);
  const writerSn = await getDoc(writerRef);
  if (writerSn.exists()) {
    const userData = writerSn.data();
    return userData;
  }
};

export const getMyRatestData = async (writer: string) => {
  const data: BoardRatest[] = [];
  const q = query(
    collection(db, "Board"),
    where("writer", "==", writer),
    orderBy("createdAt", "desc"),
    limit(6)
  ).withConverter(BoardConverter);
  const querySnapshot = await getDocs(q);
  const datas = querySnapshot.docs;

  const userData = await getMyInfo(writer);
  if (userData !== undefined) {
    datas.forEach(async (doc) => {
      const post = doc.data();
      data.push({
        ...post,
        id: doc.id,
        writer: userData.nickname,
      });
    });
  }

  return data;
};
