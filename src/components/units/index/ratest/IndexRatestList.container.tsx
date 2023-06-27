import IndexRatestListUI from "./IndexRatestList.presenter";
// import { useQuery } from "@apollo/client";
// import type {
//   IQuery,
//   IQueryFetchBoardsArgs,
// } from "../../../../commons/types/generated/types";
// import { FETCH_BOARDS } from "./IndexRatestList.queries";
import { Skeleton } from "antd";
import { useEffect, useState } from "react";
import {
  query,
  type DocumentData,
  type QueryDocumentSnapshot,
  collection,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../../../../commons/libraries/firebase";

export default function IndexRatestList(): JSX.Element {
  const [data, setData] =
    useState<Array<QueryDocumentSnapshot<DocumentData>>>();
  // const { data } = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(
  //   FETCH_BOARDS
  // );
  const getData = async (): Promise<void> => {
    const q = query(
      collection(db, "Board"),
      orderBy("createdAt", "desc"),
      limit(6)
    );
    const querySnapshot = await getDocs(q);
    const datas = querySnapshot.docs;
    setData(datas);
  };
  useEffect(() => {
    void getData();
  }, []);
  if (data === undefined) return <Skeleton />;
  return <IndexRatestListUI data={data} />;
}
