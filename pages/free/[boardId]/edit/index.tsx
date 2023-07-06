import { useRouter } from "next/router";
import { Skeleton } from "antd";
import type { DocumentData } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../../src/commons/libraries/firebase";
import dynamic from "next/dynamic";
import { userIdCheck } from "../../../../src/components/commons/hocs/loginCheck";
const BoardWrite = dynamic(
  async () =>
    await import(
      "../../../../src/components/units/board/write/BoardWrite.index"
    ),
  { ssr: false }
);
function BoardUpdatePage(): JSX.Element {
  const [data, setData] = useState<DocumentData | undefined>();
  const router = useRouter();

  useEffect(() => {
    if (typeof router.query.boardId !== "string") return;
    const docRef = doc(db, "Board", router.query.boardId);
    getDoc(docRef)
      .then((docSnap) => {
        console.log(docSnap.data());
        if (docSnap.exists()) setData(docSnap.data());
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);
  if (data === undefined) return <Skeleton />;
  return <BoardWrite isEdit={true} data={data} />;
}

export default userIdCheck(BoardUpdatePage);
