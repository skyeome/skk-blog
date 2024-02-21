import type { InfiniteData } from "react-query";
import type { IBoardList } from "../../../../commons/hooks/queries/useQueryFetchBoards";
import type { BoardRatest } from "../../index/ratest/IndexRatestList.types";

export interface IBoardListProps {
  // data: Pick<IQuery, "fetchBoards"> | undefined;
  // data: Array<QueryDocumentSnapshot<DocumentData>> | undefined;
  data: IBoardList[] | undefined;
  onLoadMore: (key: any) => void;
  lastKey: string;
  // dataBoardsCount: Pick<IQuery, "fetchBoardsCount"> | undefined;
}

export interface BoardListProps {
  data?: InfiniteData<BoardRatest[]>;
  isLoading: boolean;
}

export interface IBoardListItemProps {
  el: BoardRatest;
}
