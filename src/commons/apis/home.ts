import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import type { BoardRatest } from "../../components/units/index/ratest/IndexRatestList.types";
import { db } from "../libraries/firebase";
import { BoardConverter } from "../libraries/firestore";

export type UserIds = Record<string, string>;

const getRatestData = async () => {
  const data: BoardRatest[] = [];
  const q = query(
    collection(db, "Board"),
    orderBy("createdAt", "desc"),
    limit(6)
  ).withConverter(BoardConverter);
  const querySnapshot = await getDocs(q);
  const datas = querySnapshot.docs;

  // 사용자의 닉네임을 담을 객체
  const userMap: UserIds = {};

  // 글을 작성한 사용자의 uid를 모아서 한 번에 가져오기 위한 배열
  const userIds: string[] = [];

  datas.forEach((doc) => {
    const post = doc.data();
    const userId = post.writer;
    // 작성자의 uid를 배열에 추가
    userIds.push(userId);
  });

  const writerQuery = query(
    collection(db, "User"),
    where("uid", "in", userIds)
  );
  const writerSn = await getDocs(writerQuery);
  writerSn.forEach((userDoc) => {
    const userData = userDoc.data();
    userMap[userData.uid] = userData.nickname;
  });

  datas.forEach(async (doc) => {
    const post = doc.data();
    const userId = post.writer;
    data.push({
      ...post,
      id: doc.id,
      writer: userMap[userId] === undefined ? post.writer : userMap[userId],
    });
  });
  return data;
};

export default getRatestData;
