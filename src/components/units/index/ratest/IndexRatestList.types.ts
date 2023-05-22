import type { IQuery } from "../../../../commons/types/generated/types";

export interface IindexRatestListProps {
  data: Pick<IQuery, "fetchBoards"> | undefined;
}
