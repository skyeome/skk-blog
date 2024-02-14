import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  // where,
} from "firebase/firestore";
import type { BoardRatest } from "../../components/units/index/ratest/IndexRatestList.types";
import { db } from "../libraries/firebase";
import { BoardConverter } from "../libraries/firestore";

const getRatestData = async () => {
  const data: BoardRatest[] = [];
  const q = query(
    collection(db, "Board"),
    orderBy("createdAt", "desc"),
    limit(6)
  ).withConverter(BoardConverter);
  const querySnapshot = await getDocs(q);
  const datas = querySnapshot.docs;

  // const writerRef = collection(db, "User");
  datas.forEach(async (doc) => {
    const post = doc.data();
    // const writer = post.writer;
    // const q = query(writerRef, where("uid", "==", writer));
    // const querySn = await getDocs(q);
    // let username = "";
    // querySn.forEach((user) => {
    //   username = user.data().nickname;
    // });
    // 닉네임 있으면 작성자 이름을 닉네임으로 변경
    data.push({
      ...post,
      id: doc.id,
      // writer: username !== "" ? username : post.writer,
    });
  });
  return data;
};

export default getRatestData;
