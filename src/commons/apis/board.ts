import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../libraries/firebase";
import { BoardDetailConverter } from "../libraries/firestore";
import type { BoardDetail } from "../libraries/firestore";

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
