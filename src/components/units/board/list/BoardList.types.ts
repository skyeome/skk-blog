import type { InfiniteData } from "react-query";
import type { BoardRatest } from "../../index/ratest/IndexRatestList.types";
import type { ViewLayoutType } from "./BoardListTop.types";

export interface BoardListOldProps {
  data?: BoardRatest[] | undefined;
  onLoadMore: (key: any) => void;
  lastKey: string;
}

export interface BoardListProps {
  tag: string;
  layout: ViewLayoutType;
}

export interface BoardListUIProps {
  data?: InfiniteData<BoardRatest[]>;
  isLoading: boolean;
}

export interface BoardListItemProps {
  el: BoardRatest;
}
