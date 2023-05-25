import type { IQuery } from "../../../../commons/types/generated/types";

export interface IBoardListProps {
  data: Pick<IQuery, "fetchBoards"> | undefined;
  onLoadMore: () => void;
  dataBoardsCount: Pick<IQuery, "fetchBoardsCount"> | undefined;
}
