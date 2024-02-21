import type { InfiniteData } from "react-query";
import type { Board } from "../../../../commons/libraries/firestore";

export type BoardRatest = Board & {
  id: string;
};

export interface IndexRatestListProps {
  title?: string;
  data?: BoardRatest[];
  infiniteData?: InfiniteData<BoardRatest[]>;
  isLoading: boolean;
}
