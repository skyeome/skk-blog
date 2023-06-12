// import { useQuery } from "@apollo/client";
import type { DocumentData } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import BoardDetailUI from "./BoardDetail.presenter";
// import { FETCH_BOARD } from "./BoardDetail.queries";
// import type {
//   IQuery,
//   IQueryFetchBoardArgs,
// } from "../../../../commons/types/generated/types";
import { useRouter } from "next/router";
import { db } from "../../../../commons/libraries/firebase";
import { useEffect, useState } from "react";

export default function BoardDetail(): JSX.Element {
  const [data, setData] = useState<DocumentData | undefined>();
  const router = useRouter();
  if (typeof router.query.boardId !== "string") return <></>;
  // const { data } = useQuery<Pick<IQuery, "fetchBoard">, IQueryFetchBoardArgs>(
  //   FETCH_BOARD,
  //   { variables: { boardId: router.query.boardId } }
  // );
  const getData = async (): Promise<void> => {
    const docRef = doc(db, "Board", router.query.boardId as string);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) setData(docSnap.data());
  };
  useEffect(() => {
    void getData();
  }, []);

  const onClickEditBtn = (): void => {
    void router.push(`/free/${router.query.boardId as string}/edit`);
  };
  return <BoardDetailUI data={data} onClickEditBtn={onClickEditBtn} />;
}
