import type { Board } from "../../../../commons/libraries/firestore";

export type BoardRatest = Board & {
  id: string;
};

export interface IindexRatestListProps {
  data?: BoardRatest[];
}
