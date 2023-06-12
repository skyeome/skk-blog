import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
// import type { IQuery } from "../../../../commons/types/generated/types";

export interface IBoardListProps {
  // data: Pick<IQuery, "fetchBoards"> | undefined;
  data: Array<QueryDocumentSnapshot<DocumentData>> | undefined;
  // onLoadMore: () => void;
  // dataBoardsCount: Pick<IQuery, "fetchBoardsCount"> | undefined;
}
export interface IBoardListItemProps {
  boardId: string;
  el: DocumentData;
  colCounts: number;
}
