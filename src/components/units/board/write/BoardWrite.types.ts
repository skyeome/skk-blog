import type { BoardDetail } from "../../../../commons/libraries/firestore";

export interface IBoardWriteProps {
  isEdit: boolean;
  data?: BoardDetail;
}
export interface IBoardUpdateInputs {
  title?: string;
  contents?: string;
  category?: string[];
  images?: string[];
}

export interface IBoardWriteInputTypes {
  title?: string | undefined;
  category?: any[] | undefined;
}
