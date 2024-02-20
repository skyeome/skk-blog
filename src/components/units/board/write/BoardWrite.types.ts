import type { BoardDetail } from "../../../../commons/libraries/firestore";

export interface IBoardWriteProps {
  isEdit: boolean;
  data?: BoardDetail;
}
export interface IBoardUpdateInputs {
  title?: string;
  summary?: string;
  contents?: string;
  category?: string[];
  thumb?: string;
  thumbRef?: string;
}

export interface IBoardWriteInputTypes {
  title?: string | undefined;
  category?: any[] | undefined;
  thumbRef?: string;
}
