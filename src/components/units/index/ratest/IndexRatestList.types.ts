// import type { IQuery } from "../../../../commons/types/generated/types";

import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export interface IindexRatestListProps {
  data: Array<QueryDocumentSnapshot<DocumentData>> | undefined;
  // data: Pick<IQuery, "fetchBoards"> | undefined;
}
