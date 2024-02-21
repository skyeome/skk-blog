import type { InfiniteData } from "react-query";
import type { BoardRatest } from "../../index/ratest/IndexRatestList.types";

export interface BoardListOldProps {
  data?: BoardRatest[] | undefined;
  onLoadMore: (key: any) => void;
  lastKey: string;
}

export interface BoardListProps {
  data?: InfiniteData<BoardRatest[]>;
  isLoading: boolean;
}

export interface BoardListItemProps {
  el: BoardRatest;
}
