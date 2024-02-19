import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../libraries/firebase";
import { BoardConverter, BoardDetailConverter } from "../libraries/firestore";
import type { BoardDetail } from "../libraries/firestore";
import type { BoardRatest } from "../../components/units/index/ratest/IndexRatestList.types";
import type { UserIds } from "./home";

export const getBoardDetail = async (boardId: string) => {
  const docRef = doc(db, "Board", boardId).withConverter(BoardDetailConverter);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
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
    if (username !== "") {
      boardData.uid = boardData.writer;
      boardData.writer = username;
    }
    return boardData;
  }
};

export const getBoardsAll = async ({
  pageParam = "",
  tag,
}: {
  pageParam: any;
  tag?: string;
}) => {
  const data: BoardRatest[] = [];
  const q =
    tag === ""
      ? query(
          collection(db, "Board"),
          orderBy("createdAt", "desc"),
          startAfter(pageParam),
          limit(6)
        ).withConverter(BoardConverter)
      : query(
          collection(db, "Board"),
          where("category", "array-contains", tag),
          orderBy("createdAt", "desc"),
          startAfter(pageParam),
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
