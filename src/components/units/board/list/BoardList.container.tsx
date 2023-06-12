import { useState, useEffect } from "react";
// import { useQuery } from "@apollo/client";
import BoardListUI from "./BoardList.presenter";
// import { FETCH_BOARDS, FETCH_BOARDS_COUNT } from "./BoardList.queries";
// import type {
//   IQuery,
//   IQueryFetchBoardsArgs,
//   IQueryFetchBoardsCountArgs,
// } from "../../../../commons/types/generated/types";
import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../../../commons/libraries/firebase";

export default function BoardList(): JSX.Element {
  const [datas, setDatas] =
    useState<Array<QueryDocumentSnapshot<DocumentData>>>();
  const getDatas = async (): Promise<void> => {
    const q = query(collection(db, "Board"));
    const querySnapshot = await getDocs(q);
    const datas = querySnapshot.docs;
    setDatas(datas);
  };
  useEffect(() => {
    void getDatas();
  }, []);

  // const { data, fetchMore } = useQuery<
  //   Pick<IQuery, "fetchBoards">,
  //   IQueryFetchBoardsArgs
  // >(FETCH_BOARDS);

  // const { data: dataBoardsCount } = useQuery<
  //   Pick<IQuery, "fetchBoardsCount">,
  //   IQueryFetchBoardsCountArgs
  // >(FETCH_BOARDS_COUNT);

  // const onLoadMore = (): void => {
  //   if (data === undefined) return;
  //   void fetchMore({
  //     variables: {
  //       page: Math.ceil((data?.fetchBoards.length ?? 10) / 10) + 1,
  //     },
  //     updateQuery: (prev, { fetchMoreResult }) => {
  //       if (fetchMoreResult.fetchBoards === undefined)
  //         return { fetchBoards: [...prev.fetchBoards] };
  //       return {
  //         fetchBoards: [...prev.fetchBoards, ...fetchMoreResult.fetchBoards],
  //       };
  //     },
  //   });
  // };
  return (
    <BoardListUI
      data={datas}
      // onLoadMore={onLoadMore}
      // dataBoardsCount={dataBoardsCount}
    />
  );
}
