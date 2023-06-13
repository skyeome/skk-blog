// import type { DocumentData } from "firebase/firestore";
import type { IBoardList } from "../../../../commons/hooks/queries/useQueryFetchBoards";
// import type { IQuery } from "../../../../commons/types/generated/types";

export interface IBoardListProps {
  // data: Pick<IQuery, "fetchBoards"> | undefined;
  // data: Array<QueryDocumentSnapshot<DocumentData>> | undefined;
  data: IBoardList[] | undefined;
  onLoadMore: (key: any) => void;
  lastKey: string;
  // dataBoardsCount: Pick<IQuery, "fetchBoardsCount"> | undefined;
}
export interface IBoardListItemProps {
  // boardId: string;
  el: IBoardList;
  colCounts: number;
}
