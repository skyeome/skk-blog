import { useRouter } from "next/router";
// import BoardWrite from "../../../../src/components/units/board/write/BoardWrite.container";
// import { useQuery } from "@apollo/client";
// import type {
//   IQuery,
//   IQueryFetchBoardArgs,
// } from "../../../../src/commons/types/generated/types";
// import { FETCH_BOARD } from "../../../../src/components/units/board/detail/BoardDetail.queries";
import { Skeleton } from "antd";
import type { DocumentData } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../../src/commons/libraries/firebase";
import dynamic from "next/dynamic";
const BoardWrite = dynamic(
  async () =>
    await import(
      "../../../../src/components/units/board/write/BoardWrite.index"
    ),
  { ssr: false }
);
export default function BoardUpdatePage(): JSX.Element {
  const [data, setData] = useState<DocumentData | undefined>();
  const router = useRouter();
  if (typeof router.query.boardId !== "string") return <></>;

  // const { data } = useQuery<Pick<IQuery, "fetchBoard">, IQueryFetchBoardArgs>(
  //   FETCH_BOARD,
  //   {
  //     variables: { boardId: router.query.boardId },
  //   }
  // );
  const getData = async (): Promise<void> => {
    const docRef = doc(db, "Board", router.query.boardId as string);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data());
    if (docSnap.exists()) setData(docSnap.data());
  };
  useEffect(() => {
    void getData();
  }, []);
  if (data === undefined) return <Skeleton />;
  return <BoardWrite isEdit={true} data={data} />;
}
