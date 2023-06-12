import type { DocumentData } from "firebase/firestore";
// import type { IQuery } from "../../../../commons/types/generated/types";

export interface IBoardDetailProps {
  data: DocumentData | undefined;
  // data: Pick<IQuery, "fetchBoard"> | undefined;
  onClickEditBtn: () => void;
}
